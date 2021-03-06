import { useState } from 'react'
import _ from 'lodash'
import CSVUploader from '../components/table/CVSUploader'
import EditableTable from '../components/table/EditableTable'

export default function Home() {
  const [columns, setColumns] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  function logData() {
    console.log(data)
  }

  return (
    <div>
      {<CSVUploader setColumns={setColumns} setData={setData} error={error} setError={setError} />}
      {!_.isEmpty(data) && _.isEmpty(error) && (
        <EditableTable rawCols={columns} rawData={data} setUpdatedData={setData} />
      )}
      <button type="button" onClick={logData}>
        Log data
      </button>
    </div>
  )
}
