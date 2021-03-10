import { useRef, useState } from 'react'
import { CSVReader } from 'react-papaparse'

const CSVUploader = ({ setColumns, setData, error, setError }) => {
  const clearButtonRef = useRef(null)

  const [isFileOn, setIsFileOn] = useState(false)

  const handleOnDrop = (fileData, { type }) => {
    try {
      setIsFileOn(false)

      setError(null)

      if (type !== 'text/csv') {
        throw new Error('Archivo invalido')
      }

      const headers = fileData.shift().data.map((elem, idx) => ({ Header: elem, accessor: `${idx}` }))
      const values = fileData.map((rowElem) => ({ ...rowElem.data })).filter((elem) => Object.keys(elem).length > 1)
      setColumns(headers)
      setData(values)
      setIsFileOn(true)
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

  const handleOnError = (err) => {
    console.log(err)
    setError(true)
  }

  const handleRemoveFile = (e) => {
    setIsFileOn(false)
    setError(null)
    if (clearButtonRef.current) {
      clearButtonRef.current.removeFile(e)
      setColumns(null)
      setData(null)
    }
  }

  return (
    <div>
      <CSVReader ref={clearButtonRef} onDrop={handleOnDrop} onError={handleOnError}>
        <span>Cliquea aquí o arrastra tu archivo .CVS a esta región para subir.</span>
      </CSVReader>
      {error?.message && <div>Error: {error.message}</div>}
      <button
        type="button"
        onClick={handleRemoveFile}
        w="auto"
        style={{ visibility: handleElementVisibility(error, isFileOn) }}
      >
        Eliminar archivo
      </button>
    </div>
  )
}

export default CSVUploader

function handleElementVisibility(...rest) {
  const isAnyflagTruthy = rest.some((flag) => !!flag)
  const ret = isAnyflagTruthy ? 'visible' : 'hidden'
  return ret
}
