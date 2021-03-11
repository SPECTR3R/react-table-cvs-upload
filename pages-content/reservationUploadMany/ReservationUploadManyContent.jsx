import { useState } from 'react'
import _ from 'lodash'
import CSVUploader from '../../components/table/CVSUploader'
import EditableTable from '../../components/table/EditableTable'

import ReservationUploadForm from './ReservationUploadForm'

export default function ReservationUploadManyContent() {
  const [columns, setColumns] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  return (
    <>
      {<CSVUploader setColumns={setColumns} setData={setData} error={error} setError={setError} />}
      {!_.isEmpty(data) && _.isEmpty(error) && (
        <EditableTable rawCols={columns} rawData={data} setUpdatedData={setData} />
      )}
      {!_.isEmpty(data) && (
        <div>
          <ReservationUploadForm reservationCVSData={data} reservationCVSheaders={columns} />
        </div>
      )}
    </>
  )
}
