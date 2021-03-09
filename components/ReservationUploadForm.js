import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import DropdownSelectGenerator from './DropdownSelectGenerator'

const ReservationUploadForm = ({ selectableOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState({})

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

  const handleFormSubmit = (e) => {
    // localStorage.setItem('Reservation_Data', selectedOptions)
    e.preventDefault()
    console.log(selectedOptions)
  }

  const inputFields = [
    {
      label: 'Tipo de habitación',
      name: 'rooms.name',
      required: true,
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

  
  return (
    <div>
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

        <button type="submit">Log data</button>
      </form>
    </div>
  )
}

export default ReservationUploadForm
// falta selected en option
