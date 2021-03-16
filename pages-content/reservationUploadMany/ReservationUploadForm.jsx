import { useEffect, useState } from 'react'
import DropdownSelectGenerator from '../../components/DropdownSelectGenerator'
import { getDataCache, setDataToCache } from '../../libs/cacheService'
import { inputFields, separatedNameInputFields, connectedNameInputFields } from './reservationUploadFormConstants'
import {processCSVReservationObj} from '../js.js'

const ReservationUploadForm = ({ reservationCSVHeaders, reservationCSVData }) => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [reservationNameFields, setReservationNameFields] = useState([...separatedNameInputFields, ...inputFields])
  const [isNameSeparated, setIsNameSeparated] = useState('true')

  useEffect(() => {
    const cache = getDataCache('DATA_CACHE')
    const cachedSelectedOptions = cache?.data?.inputValues?.selectedOptions ?? {}
    const cachedIsNameSeparated = cache?.data?.inputValues?.isNameSeparated ?? 'true'
    setSelectedOptions(cachedSelectedOptions)
    setIsNameSeparated(cachedIsNameSeparated)

    if (cachedIsNameSeparated === 'true') setReservationNameFields([...separatedNameInputFields, ...inputFields])
    else setReservationNameFields([...connectedNameInputFields, ...inputFields])
  }, [setSelectedOptions, setIsNameSeparated, setReservationNameFields])

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

    // const Headers = reservationCSVHeaders.map(({ Header }) => Header)
    // console.log(reservationCSVData, 'antes del parseo')
    // const reservationsData = reservationCSVData.map((reservation, idx) => {
    //   const reservationObj = {}

    //   return reservationObj[Headers]
    // })

    // console.log(Headers)

    console.log(JSON.stringify(reservationCSVData))
    console.log(JSON.stringify(reservationCSVHeaders))
    console.log(JSON.stringify(selectedOptions))

    ///  crear fcn que reciba rl,l, lknkkkeservation data
    // console.log('selected', se,.lectedOptions, reservationCSVHeaders, reservationCSVData)
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
