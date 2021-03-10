import { useState, useEffect } from 'react'
import _ from 'lodash'
import CSVUploader from '../components/table/CVSUploader'
import EditableTable from '../components/table/EditableTable'

import ReservationUploadForm from '../components/ReservationUploadForm'

export default function Home() {
  const [columns, setColumns] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const reservationInputFields = [
    {
      label: 'Fecha de llegada',
      name: 'arrivalDate',
    },
    {
      label: 'Fecha de salida',
      name: 'departureDate',
    },
    {
      label: 'Nombre',
      name: 'firstName',
    },
    {
      label: 'Apellidos',
      name: 'lastName',
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

  console.log(data)
  return (
    <>
      {<CSVUploader setColumns={setColumns} setData={setData} error={error} setError={setError} />}
      {!_.isEmpty(data) && _.isEmpty(error) && (
        <EditableTable rawCols={columns} rawData={data} setUpdatedData={setData} />
      )}
      {!_.isEmpty(data) && (
        <div>
          <ReservationUploadForm
            reservationsData={data}
            inputFields={reservationInputFields}
            selectableOptions={columns.map((column) => column.Header)}
            columns={columns}
          />
        </div>
      )}
    </>
  )
}
