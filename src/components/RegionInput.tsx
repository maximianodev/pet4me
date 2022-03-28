import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react'

interface Address {
  sigla: string;
  nome: string;
}

interface RegionInputProps {
  data: Address[];
  label: string;
  labelId: string;
  setComponentState: (state: Address) => void;
  componentState: Address;
}

const RegionInput = ({ data, label, labelId, setComponentState, componentState }: RegionInputProps): JSX.Element => {
  const handleSelectState = (event) => {
    const searchStateSelected = data.find(item => {
      return item.nome === event.target.value
    })

    setComponentState(searchStateSelected)
  }

  return (
    <FormControl>
      <FormLabel htmlFor={labelId}>
        {label}
      </FormLabel>
      <Select
        id={labelId}
        onChange={handleSelectState}
        value={componentState?.nome ?? ''}
      >
        <option value=''></option>
        {data.map(state => (
          <option
            value={state.nome}
            key={state.nome}
          >
            {state.nome}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default RegionInput
