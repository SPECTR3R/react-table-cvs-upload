import { useEffect, useState } from 'react'
import _ from 'lodash'
import DropdownSelectGenerator from './DropdownSelectGenerator'
import { getDataCache, setDataToCache } from './utils'

const ReservationUploadForm = ({ selectableOptions, reservationsData }) => {
  const inputFields = [
    {
      label: 'Fecha de llegada',
      name: 'arrivalDate ',
      required: true,
    },
    {
      label: 'Fecha de salida',
      name: 'departureDate',
      required: true,
    },
    {
      label: 'Número de adultos',
      name: 'adultsCount',
      required: true,
    },
    {
      label: 'Número de niños',
      name: 'childrenCount',
      required: true,
    },

    {
      label: 'Origen de la reservación',
      name: 'createdBy',
    },
    {
      label: 'Número de la reservación',
      name: 'reservationNumber',
      required: true,
    },
    {
      label: 'Tipo de reservación',
      name: 'reservationType',
    },
  ]

  const separatedNameInputFields = [
    {
      label: 'Nombres',
      name: 'firstName',
      required: true,
    },
    {
      label: 'Apellido',
      name: 'lastName',
      required: true,
    },
  ]

  const connectedNameInputFields = [
    {
      label: 'Nombre y Apellido',
      name: 'firstName',
    },
  ]

  const [selectedOptions, setSelectedOptions] = useState({})
  const [reservationNameFields, setReservationNameFields] = useState(inputFields)
  const [isNameSeparated, setIsNameSeparated] = useState('true')

  useEffect(() => {
    if (!_.isEmpty(selectedOptions)) return
    const cache = getDataCache('DATA_CACHE')
    const cacheData = cache?.data?.inputValues?.selectedOptions
    if (_.isEmpty(cacheData)) return
    setSelectedOptions((prev) => {
      const appendOtions = { ...cacheData, ...prev }
      delete appendOtions.firstName
      delete appendOtions.lastName
      return appendOtions
    })
  }, [selectedOptions])

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setSelectedOptions((prevInputData) => ({ ...prevInputData, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // console.log(reservationsData, 'holi')
    // console.log(selectedOptions, 'holi')
    setDataToCache({ selectedOptions })
    console.log('selected', selectedOptions)
    // console.log(columns)
    // const result = basariReservationGenerator(reservationsData, selectedOptions)
    // console.table(result)
  }

  const handleRadioChange = (e) => {
    if (e.target.value === 'true') {
      setIsNameSeparated('true')
      return setReservationNameFields([...separatedNameInputFields, ...inputFields])
    }
    setIsNameSeparated('false')
    return setReservationNameFields([...connectedNameInputFields, ...inputFields])
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
            selectedOption={selectedOptions[name]}
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
