export default function DropdownSelectGenerator({
  optionsArr,
  label,
  name,
  handleSelectChange,
  selectedOption = '',
  required,
}) {
  return (
    <fieldset>
      <br />
      <label htmlFor={name}>{label}</label>
      <select name={name} value={selectedOption} onChange={handleSelectChange} required={required}>
        <option hidden disabled value="">
          Selecione la columna a Relacionar
        </option>
        {optionsArr.map((optionsValue, idx) => (
          <option key={`name${idx}`} value={optionsValue}>
            {optionsValue}
          </option>
        ))}
      </select>
      <br />
    </fieldset>
  )
}
