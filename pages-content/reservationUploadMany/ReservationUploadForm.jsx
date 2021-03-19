import { useEffect, useState } from 'react'
import DropdownSelectGenerator from '../../components/DropdownSelectGenerator'
import { getDataCache, setDataToCache } from '../../libs/cacheService'
import { inputFields, separatedNameInputFields, connectedNameInputFields } from './reservationUploadFormConstants'
import { processCSVReservationObj } from '../../js.js'

const ReservationUploadForm = ({ reservationCSVHeaders, reservationCSVData }) => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [reservationNameFields, setReservationNameFields] = useState([...separatedNameInputFields, ...inputFields])
  const [isNameConnectedOrSeparated, setIsNameConnectedOrSeparated] = useState('firstNameAndLastNameSeparated')

  useEffect(() => {
    const cache = getDataCache('DATA_CACHE')
    const cachedSelectedOptions = cache?.data?.inputValues?.selectedOptions ?? {}
    const cachedIsNameSeparated =
      cache?.data?.inputValues?.isNameConnectedOrSeparated ?? 'firstNameAndLastNameSeparated'

    setSelectedOptions(cachedSelectedOptions)
    setIsNameConnectedOrSeparated(cachedIsNameSeparated)

    if (cachedIsNameSeparated === 'firstNameAndLastNameSeparated')
      setReservationNameFields([...separatedNameInputFields, ...inputFields])
    else setReservationNameFields([...connectedNameInputFields, ...inputFields])
  }, [setSelectedOptions, setIsNameConnectedOrSeparated, setReservationNameFields])

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setSelectedOptions((prevInputData) => ({ ...prevInputData, [name]: value }))
    return setDataToCache({ selectedOptions, isNameConnectedOrSeparated })
  }

  const handleRadioChange = (e) => {
    if (e.target.value === 'firstNameAndLastNameSeparated') {
      setIsNameConnectedOrSeparated('firstNameAndLastNameSeparated')
      setReservationNameFields([...separatedNameInputFields, ...inputFields])
      return setDataToCache({ selectedOptions, isNameConnectedOrSeparated: 'firstNameAndLastNameSeparated' })
    }

    if (e.target.value === 'firstNameConnectedByAComma') {
      setIsNameConnectedOrSeparated('firstNameConnectedByAComma')
      setReservationNameFields([...connectedNameInputFields, ...inputFields])
      return setDataToCache({ selectedOptions, isNameConnectedOrSeparated: 'firstNameConnectedByAComma' })
    }

    if (e.target.value === 'lastNameConnectedByAComma') {
      setIsNameConnectedOrSeparated('lastNameConnectedByAComma')
      setReservationNameFields([...connectedNameInputFields, ...inputFields])
      return setDataToCache({ selectedOptions, isNameConnectedOrSeparated: 'lastNameConnectedByAComma' })
    }
    if (e.target.value === 'firstNameConnectedByASpace') {
      setIsNameConnectedOrSeparated('firstNameConnectedByASpace')
      setReservationNameFields([...connectedNameInputFields, ...inputFields])
      return setDataToCache({ selectedOptions, isNameConnectedOrSeparated: 'firstNameConnectedByASpace' })
    }
    setIsNameConnectedOrSeparated('lastNameConnectedByASpace')
    setReservationNameFields([...connectedNameInputFields, ...inputFields])
    return setDataToCache({ selectedOptions, isNameConnectedOrSeparated: 'lastNameConnectedByASpace' })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const finalOutput = reservationCSVData.map((singleRes) =>
      processCSVReservationObj(singleRes, reservationCSVHeaders, selectedOptions, isNameConnectedOrSeparated)
    )
    console.log(finalOutput)

    // const Headers = reservationCSVHeaders.map(({ Header }) => Header)
    // console.log(reservationCSVData, 'antes del parseo')
    // const reservationsData = reservationCSVData.map((reservation, idx) => {
    //   const reservationObj = {}

    //   return reservationObj[Headers]
    // })

    // console.log(Headers)

    // console.log(JSON.stringify(reservationCSVData))
    // console.log(JSON.stringify(reservationCSVHeaders))
    // console.log(JSON.stringify(selectedOptions))

    ///  crear fcn que reciba rl,l, lknkkkeservation data
    // console.log('selected', se,.lectedOptions, reservationCSVHeaders, reservationCSVData)
  }

  return (
    <>
      <fieldset>
        <input
          type="radio"
          value="firstNameAndLastNameSeparated"
          onChange={handleRadioChange}
          name="gender"
          checked={isNameConnectedOrSeparated === 'firstNameAndLastNameSeparated'}
        />
        Nombre y apellido en campos separados
        <br />
        <input
          type="radio"
          value="firstNameConnectedByAComma"
          onChange={handleRadioChange}
          name="gender"
          checked={isNameConnectedOrSeparated === 'firstNameConnectedByAComma'}
        />
        Nombre primero, en un campo separados por una coma
        <br />
        <input
          type="radio"
          value="lastNameConnectedByAComma"
          onChange={handleRadioChange}
          name="gender"
          checked={isNameConnectedOrSeparated === 'lastNameConnectedByAComma'}
        />
        Apellido primero, en un campo separados por una coma
        <br />
        <input
          type="radio"
          value="firstNameConnectedByASpace"
          onChange={handleRadioChange}
          name="gender"
          checked={isNameConnectedOrSeparated === 'firstNameConnectedByASpace'}
        />
        Nombre primero en un campo separados por una espacio
        <br />
        <input
          type="radio"
          value="lastNameConnectedByASpace"
          onChange={handleRadioChange}
          name="gender"
          checked={isNameConnectedOrSeparated === 'lastNameConnectedByASpace'}
        />
        Apellido primero en un campo separados por una espacio
      </fieldset>
      <form onSubmit={handleFormSubmit}>
        {reservationNameFields.map(({ label, name, required }, idx) => (
          <DropdownSelectGenerator
            key={`${name}Select${idx}`}
            optionsArr={reservationCSVHeaders.map((header) => header.Header)}
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
