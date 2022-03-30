import { Button, Flex, FormLabel, Icon, Select, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Address {
  sigla: string;
  nome: string;
}

interface RegionInputProps {
  data: Address[];
  label: string;
  labelId: string;
  setComponentState: (state: Address) => void;
}

const defaultValue = {
  nome: '',
  sigla: '',
};

const RegionInput = ({
  data,
  label,
  labelId,
  setComponentState,
}: RegionInputProps): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectState = (event): void => {
    event.preventDefault();
    if (!selectedValue) return;

    const searchStateSelected = data.find(item => {
      return item.nome === selectedValue;
    });

    setComponentState(searchStateSelected);
  };

  const handleSelectInput = (ev): void => {
    setSelectedValue(ev.target.value);
  };

  return (
    <form onSubmit={handleSelectState}>
      <FormLabel htmlFor={labelId}>{label}</FormLabel>
      <Flex>
        <Select id={labelId} onChange={handleSelectInput}>
          <option value="" />
          {data.map(state => (
            <option value={state.nome} key={state.nome}>
              {state.nome}
            </option>
          ))}
        </Select>
        <Button
          type="submit"
          size="md"
          ml="2"
          fontWeight="regular"
          fontSize="sm"
          px="7"
        >
          Próximo
          <Icon as={FiChevronRight} ml="2" />
        </Button>
      </Flex>
    </form>
  );
};

export default RegionInput;
