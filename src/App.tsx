import React, { useState } from 'react'
import { AppStyled, ReportStyled } from './AppStyles'
import { CommandHistory } from './components/CommandHistory/CommandHistory'
import { CommandLine } from './components/CommandLine/CommandLine'
import { Header } from './components/Header/Header'
import { TableTop } from './components/TableTop/TableTop'
import type { CommandType, CommandHistoryType, TableStateType } from './globalTypes'

const App: React.FC = () => {
  const initialState: TableStateType = {
    gridSize: 5,
    robotIsPlaced: false,
  }
  const [tableState, setTableState] = useState(initialState)
  const [history, setHistory] = useState<CommandHistoryType[]>([])

  const processCommand = (command: CommandType, newTableState: TableStateType): void => {
    setTableState(newTableState)
    setHistory([...history, { ...command, order: history.length + 1 }])
  }

  return (
    <AppStyled>
      <Header heading="Toy Robot Coding Challenge " />
      <TableTop tableState={tableState} />
      {tableState.reportPosition && (
        <ReportStyled>
          Report Output:{' '}
          <strong aria-label="report-output">{`${tableState.xcoord},${tableState.ycoord},${tableState.faceDirection}`}</strong>
        </ReportStyled>
      )}
      <CommandLine onCommand={processCommand} tableState={tableState} />
      <CommandHistory commands={history} />
    </AppStyled>
  )
}

export default App
