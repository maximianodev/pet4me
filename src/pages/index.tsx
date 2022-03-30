import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Flex, Button, Icon } from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';

import RegionInput from '../components/RegionInput';

interface Address {
  sigla: string;
  nome: string;
}

interface HomeProps {
  states: Address[];
}

const defaultValue = {
  nome: '',
  sigla: '',
};

const Home = ({ states }: HomeProps): JSX.Element => {
  const [state, setState] = useState<Address>(defaultValue);
  const [counties, setCounties] = useState<Address[]>([defaultValue]);
  const [country, setCountry] = useState<Address>(defaultValue);

  const router = useRouter();

  useEffect(() => {
    const handleSetState = async (): Promise<void> => {
      if (state.nome !== '') {
        const countiesData = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.sigla}/municipios`
        );

        setCounties(countiesData.data);
      }
    };

    handleSetState();
  }, [state]);

  useEffect(() => {
    const handleSetCountry = async (): Promise<void> => {
      if (country.nome !== '') {
        const data = {
          city: country.nome,
          state: state.nome,
        };

        localStorage.setItem('address', JSON.stringify(data));
        document.cookie = `address=${JSON.stringify(data)};`;
        router.push('/search/all');
      }
    };

    handleSetCountry();
  }, [country, router, state?.nome]);

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex direction="column">
        {state.nome === '' ? (
          <RegionInput
            label="Selecione seu Estado:"
            labelId="state"
            data={states}
            setComponentState={setState}
          />
        ) : (
          <>
            <Button
              onClick={() => setState(defaultValue)}
              size="md"
              fontWeight="regular"
              fontSize="12px"
              backgroundColor="transparent"
              p="0"
              h="auto"
              w="auto"
              minW="auto"
              mb="2"
              d="block"
              alignSelf="flex-start"
              _hover={{
                backgroundColor: 'transparent',
              }}
              _active={{
                backgroundColor: 'transparent',
              }}
            >
              <Flex align="center" justify="center">
                <Icon as={FiChevronLeft} mr="2" />
                Voltar
              </Flex>
            </Button>
            <RegionInput
              label="Selecione sua Cidade:"
              labelId="city"
              data={counties}
              setComponentState={setCountry}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const states = await axios.get(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  );

  return { props: { states: states.data } };
};
