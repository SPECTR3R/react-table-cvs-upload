import React from 'react'

const ColumnRelation = ({ columns,  }) => (
  <div>
    <select placeholder="Select option">
      {[...Array(columns.length).keys()].map((key) => (
        <option key="key" value={`option${key}`}>
          Columna {key}
        </option>
      ))}
    </select>
  </div>
)

export default ColumnRelation
