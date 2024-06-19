import React, { ReactNode } from 'react'

interface Header {
  name: string
  width: string
}

interface TableProps {
  headers: Header[]
  data: ReactNode[][]
}

const Table = ({ headers, data }: TableProps) => (
  <table>
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} style={{ width: header.width }}>
            {header.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default Table
