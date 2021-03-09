export default function DropdownSelectGenerator({
  optionsArr,
  label,
  name,
  handleSelectChange,
  selectedOption,
  required,
}) {
  // const [error, setError] = useState('')

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={selectedOption} onChange={handleSelectChange} required={required}>
        <option hidden disabled selected={!selectedOption} value="">
          Selecione la columna a Relacionar
        </option>
        {optionsArr.map((optionsValue, idx) => (
          <option key={`name${idx}`} selected={selectedOption === optionsValue} value={optionsValue}>
            {optionsValue}
          </option>
        ))}
      </select>
      {/* <div>{error}</div> */}
    </>
  )
}
