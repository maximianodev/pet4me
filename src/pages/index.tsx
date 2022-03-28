import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios'

import { Flex, Button, Icon } from '@chakra-ui/react'
import { FiChevronLeft } from 'react-icons/fi';

import RegionInput from '../components/RegionInput';

interface Address {
  sigla: string;
  nome: string;
}

interface HomeProps {
  states: Address[]
}

const defaultValue = {
  nome: '',
  sigla: ''
}

const Home = ({ states }: HomeProps): JSX.Element => {
  const [state, setState] = useState<Address>(defaultValue)
  const [counties, setCounties] = useState<Address[]>([defaultValue])
  const [country, setCountry] = useState<Address>(defaultValue)

  const router = useRouter()

  const handleSetState = async () => {
    if (state.nome !== '') {
      const countiesData = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.sigla}/municipios`
      )

      setCounties(countiesData.data)
    }
  }

  const handleSetCountry = async () => {
    if (country.nome !== '') {
      const data = {
        city: country.nome,
        state: state.nome
      }

      localStorage.setItem('address', JSON.stringify(data))
      document.cookie = `address=${JSON.stringify(data)};`
      router.push('/search/all')
    }
  }

  useEffect(() => { handleSetCountry() }, [country])
  useEffect(() => { handleSetState() }, [state])

  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >

      <Flex
        direction='column'
      >
        {state.nome !== '' ?
          <Flex
            align='end'
          >
            <Button
              onClick={() => setState(defaultValue)}
              size='md'
              mr='2'
            >
              <Icon as={FiChevronLeft} />
            </Button>
            <RegionInput
              label='Selecione sua Cidade:'
              labelId='city'
              data={counties}
              setComponentState={setCountry}
              componentState={country}
            />
          </Flex>
          :
          <RegionInput
            label='Selecione seu Estado:'
            labelId='state'
            data={states}
            setComponentState={setState}
            componentState={state}
          />}
      </Flex>
    </Flex>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {

  const states = await axios.get(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  )

  return { props: { states: states.data } };
};

