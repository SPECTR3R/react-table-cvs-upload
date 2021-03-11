import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import DropdownSelectGenerator from './DropdownSelectGenerator'
import { getDataCache, setDataToCache } from './utils'

const ReservationUploadForm = ({ selectableOptions, reservationsData }) => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [reservationNameFields, setReservationNameFields] = useState([])
  const [isNameSeparated, setIsNameSeparated] = useState('false')

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

  const inputFields = [
    // {
    //   label: 'Tipo de habitación',
    //   name: 'roomType.name',
    //   required: true,
    // },
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

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {inputFields.map(({ label, name, required }, idx) => (
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
        <div
          onChange={(e) => {
            if (e.target.value === 'true') {
              setIsNameSeparated('true')
              return setReservationNameFields(separatedNameInputFields)
            }
            setIsNameSeparated('false')
            return setReservationNameFields(connectedNameInputFields)
          }}
        >
          <input type="radio" value="true" name="gender" /> Nombre y apellido por separado
          <input type="radio" value="false" name="gender" /> Nombre y apellido junto
        </div>
        {reservationNameFields.map(({ name, label }, idx) => (
          <DropdownSelectGenerator
            key="Select"
            optionsArr={selectableOptions}
            label={label}
            name={name}
            selectedOption={selectedOptions[name]}
            handleSelectChange={handleSelectChange}
          />
        ))}

        <button type="submit">Log data</button>
      </form>
    </>
  )
}

export default ReservationUploadForm
// falta selected en option
