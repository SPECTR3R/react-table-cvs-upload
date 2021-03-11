import { useEffect, useState } from 'react'
import DropdownSelectGenerator from '../../components/DropdownSelectGenerator'
import { getDataCache, setDataToCache } from '../../libs/utils'
import { inputFields, separatedNameInputFields, connectedNameInputFields } from './reservationUploadFormConstants'

const ReservationUploadForm = ({ selectableOptions, reservationsData }) => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [reservationNameFields, setReservationNameFields] = useState([...separatedNameInputFields, ...inputFields])
  const [isNameSeparated, setIsNameSeparated] = useState('true')

  useEffect(() => {
    const cache = getDataCache('DATA_CACHE')
    const cachedSelectedOptions = cache?.data?.inputValues?.selectedOptions
    const cachedIsNameSeparated = cache?.data?.inputValues?.isNameSeparated
    console.log(cachedSelectedOptions, cachedIsNameSeparated)
    setSelectedOptions(cachedSelectedOptions)
    setIsNameSeparated(cachedIsNameSeparated)
  }, [setSelectedOptions, setIsNameSeparated])

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setSelectedOptions((prevInputData) => ({ ...prevInputData, [name]: value }))
    return setDataToCache({ selectedOptions, isNameSeparated })
  }

  const handleRadioChange = (e) => {
    if (e.target.value === 'true') {
      setIsNameSeparated('true')
      setReservationNameFields([...separatedNameInputFields, ...inputFields])

      return setDataToCache({ selectedOptions, isNameSeparated: 'true' })
    }
    setIsNameSeparated('false')
    setReservationNameFields([...connectedNameInputFields, ...inputFields])
    return setDataToCache({ selectedOptions, isNameSeparated: 'false' })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    console.log('selected', selectedOptions)
  }

  return (
    <>
      <fieldset>
        <input
          type="radio"
          value="true"
          onChange={handleRadioChange}
          name="gender"
          checked={isNameSeparated === 'true'}
        />
        Nombre y apellido por separado
        <input
          type="radio"
          value="false"
          onChange={handleRadioChange}
          name="gender"
          checked={isNameSeparated === 'false'}
        />
        Nombre y apellido junto
      </fieldset>
      <form onSubmit={handleFormSubmit}>
        {reservationNameFields.map(({ label, name, required }, idx) => (
          <DropdownSelectGenerator
            key={`${name}Select${idx}`}
            optionsArr={selectableOptions}
            label={label}
            name={name}
            selectedOption={selectedOptions?.[name] || ''}
            required={required}
            handleSelectChange={handleSelectChange}
          />
        ))}

        <button type="submit">Log data</button>
      </form>
    </>
  )
}

export default ReservationUploadForm
