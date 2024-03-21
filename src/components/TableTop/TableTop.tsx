import React from 'react'
import { Table, TableCell, TableCellActive } from './TableTopStyles'
import type { TableStateType } from '../../globalTypes'

interface PropsType {
  tableState: TableStateType
}

export const TableTop: React.FC<PropsType> = (props) => {
  const {
    tableState: { faceDirection, gridSize, robotIsPlaced, xcoord, ycoord },
  } = props

  const getColumnCells = (rowNumber: number): JSX.Element[] => {
    const cells = []
    let i = 0

    while (i < gridSize) {
      if (i === xcoord && rowNumber === ycoord && robotIsPlaced && faceDirection) {
        cells.push(<TableCellActive faceDirection={faceDirection} key={`col${rowNumber}${i}`} />)
      } else {
        cells.push(<TableCell key={`col${rowNumber}${i}`} />)
      }
      i++
    }

    return cells
  }

  const printTableRows = (): JSX.Element[] => {
    const rows = []
    let i = gridSize - 1

    while (i >= 0) {
      rows.push(<tr key={`row ${i}`}>{getColumnCells(i)}</tr>)
      i--
    }

    return rows
  }

  return (
    <Table>
      <tbody>{printTableRows()}</tbody>
    </Table>
  )
}
