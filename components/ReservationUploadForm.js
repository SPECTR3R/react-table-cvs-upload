import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import DropdownSelectGenerator from './DropdownSelectGenerator'

const ReservationUploadForm = ({ selectableOptions, reservationsData, columns }) => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [reservationNameFields, setReservationNameFields] = useState([])

  // useEffect(() => {
  //   if (!_.isEmpty(selectedOptions)) {
  //     const cache = localStorage.getItem('Reservation_Data')
  //     setSelectedOptions(cache)
  //   }
  // }, [selectedOptions])

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setSelectedOptions((prevInputData) => ({ ...prevInputData, [name]: value }))
  }

  console.log(reservationsData, 'la reservació si sin n')

  const basariReservationGenerator = (reservationsArr, values) => {
    const result = reservationsArr.map((res, idx) => {
      const reservation = {}

      reservation.adultsCount = res[values]
      return reservation
    })
    console.log(result)
    return result
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.table(reservationsData)
    const result = basariReservationGenerator(reservationsData, selectedOptions)
    console.table(result)
  }

  const inputFields = [
    {
      label: 'Tipo de habitación',
      name: 'roomType.name',
    },
    {
      label: 'Fecha de llegada',
      name: 'arrivalDate',
    },
    {
      label: 'Fecha de salida',
      name: 'departureDate',
    },
    {
      label: 'Número de adultos',
      name: 'adultsCount',
    },
    {
      label: 'Número de niños',
      name: 'childrenCount',
    },
    {
      label: 'Acompañantes',
      name: 'occupants',
    },
    {
      label: 'Origen de la reservación',
      name: 'createdBy',
    },
    {
      label: 'Número de la reservación',
      name: 'reservationNumber',
    },
    {
      label: 'Tipo de reservación',
      name: 'reservationType',
    },
  ]

  const separateNameInputFields = [
    {
      label: 'Nombres',
      name: 'firstName',
    },
    {
      label: 'Apellido',
      name: 'lastName',
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
        <div style={{ display: 'inline - block' }} value={reservationNameFields ? 'true' : 'false'}>
          <label htmlFor="name">
            Nombre y apellido por separado
            <input
              type="radio"
              onChange={() => setReservationNameFields(separateNameInputFields)}
              name="reservationNameFields"
            />
          </label>
          <label htmlFor="lastName">
            Nombre y apellido juntos
            <input
              type="radio"
              onChange={() => setReservationNameFields(connectedNameInputFields)}
              name="reservationNameFields"
            />
          </label>
          {reservationNameFields.map(({ name, label }, idx) => (
            <DropdownSelectGenerator
              key={`${name}Select${idx}`}
              optionsArr={selectableOptions}
              label={label}
              name={name}
              selectedOption={selectedOptions[name]}
              handleSelectChange={handleSelectChange}
            />
          ))}
        </div>

        <button type="submit">Log data</button>
      </form>
    </>
  )
}

export default ReservationUploadForm
// falta selected en option
