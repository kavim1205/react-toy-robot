import update from 'immutability-helper'
import React, { useState } from 'react'
import { BaseCommandEnum, RobotFaceDirectionEnum } from '../../globalTypes'
import type { CommandType, TableStateType } from '../../globalTypes'
import { CommandLineInputHandler } from './CommandLineInputHandler'
import { CommandLineStyled } from './CommandLineStyles'

interface PropsType {
  onCommand: (command: CommandType, newTableState: TableStateType) => void
  tableState: TableStateType
}

export const CommandLine: React.FC<PropsType> = (props) => {
  const { onCommand, tableState } = props
  const [error, setError] = useState<string | null>(null)

  const tryPlaceRobot = (command: CommandType): void => {
    const { baseCommand, faceDirection, fullString, xcoord, ycoord } = command

    let placeError = null

    if (faceDirection === undefined || xcoord === undefined || ycoord === undefined) {
      placeError = 'Bad Command: expected 4 arguments'
    } else {
      if (!Number.isInteger(xcoord) || !Number.isInteger(ycoord)) {
        placeError = 'Bad Command: X and Y coordinates must be integers'
      }

      if (xcoord < 0 || ycoord < 0 || xcoord >= tableState.gridSize || ycoord >= tableState.gridSize) {
        placeError = 'Bad Command: coordinates are off the table'
      }

      const allowedDirections = Object.values(RobotFaceDirectionEnum) as string[]
      if (!faceDirection || !allowedDirections.includes(faceDirection)) {
        placeError = `Bad Command: direction must be one of ${Object.values(allowedDirections).join(', ')}`
      }
    }

    setError(placeError)
    onCommand(
      {
        baseCommand,
        error: placeError,
        faceDirection: !placeError ? (faceDirection as RobotFaceDirectionEnum) : undefined,
        fullString,
        xcoord,
        ycoord,
      },
      update(tableState, {
        faceDirection: { $set: !placeError ? (faceDirection as RobotFaceDirectionEnum) : tableState.faceDirection },
        reportPosition: { $set: false },
        robotIsPlaced: { $set: !placeError ? true : tableState.robotIsPlaced },
        xcoord: { $set: !placeError ? xcoord : tableState.xcoord },
        ycoord: { $set: !placeError ? ycoord : tableState.ycoord },
      })
    )
  }

  const tryMoveRobot = (command: CommandType): void => {
    const { faceDirection, gridSize, robotIsPlaced, xcoord, ycoord } = tableState

    let moveError = null
    let x = xcoord
    let y = ycoord

    if (!robotIsPlaced || x === undefined || y === undefined) {
      moveError = 'Cannot move unplaced robot'
    } else {
      if (faceDirection === RobotFaceDirectionEnum.East) {
        x = x >= gridSize - 1 ? x : x + 1
      } else if (faceDirection === RobotFaceDirectionEnum.North) {
        y = y >= gridSize - 1 ? y : y + 1
      } else if (faceDirection === RobotFaceDirectionEnum.South) {
        y = y === 0 ? y : y - 1
      } else if (faceDirection === RobotFaceDirectionEnum.West) {
        x = x === 0 ? x : x - 1
      }
      moveError = x === xcoord && y === ycoord ? 'Cannot move robot off the table' : null
    }

    setError(moveError)
    onCommand(
      {
        baseCommand: 'MOVE',
        error: moveError,
        fullString: command.fullString,
      },
      update(tableState, {
        reportPosition: { $set: false },
        xcoord: { $set: x },
        ycoord: { $set: y },
      })
    )
  }

  const tryTurnRobot = (command: CommandType): void => {
    const { faceDirection, robotIsPlaced } = tableState
    const { baseCommand, fullString } = command

    let turnError = null
    let newDir: RobotFaceDirectionEnum | undefined = faceDirection

    if (robotIsPlaced && faceDirection) {
      if (faceDirection === RobotFaceDirectionEnum.East) {
        newDir = baseCommand === BaseCommandEnum.Left ? RobotFaceDirectionEnum.North : RobotFaceDirectionEnum.South
      }
      if (faceDirection === RobotFaceDirectionEnum.North) {
        newDir = baseCommand === BaseCommandEnum.Left ? RobotFaceDirectionEnum.West : RobotFaceDirectionEnum.East
      }
      if (faceDirection === RobotFaceDirectionEnum.South) {
        newDir = baseCommand === BaseCommandEnum.Left ? RobotFaceDirectionEnum.East : RobotFaceDirectionEnum.West
      }
      if (faceDirection === RobotFaceDirectionEnum.West) {
        newDir = baseCommand === BaseCommandEnum.Left ? RobotFaceDirectionEnum.South : RobotFaceDirectionEnum.North
      }
    } else {
      turnError = 'Cannot turn unplaced robot'
    }

    setError(turnError)
    onCommand(
      {
        baseCommand,
        error: turnError,
        fullString,
      },
      update(tableState, {
        faceDirection: { $set: newDir },
        reportPosition: { $set: false },
      })
    )
  }

  const tryReportPosition = (command: CommandType): void => {
    const { faceDirection, robotIsPlaced, xcoord, ycoord } = tableState

    let reportError = null
    if (!robotIsPlaced) {
      reportError = 'Cannot report position of unplaced robot'
      setError(reportError)
    }

    setError(reportError)
    onCommand(
      {
        baseCommand: 'REPORT',
        error: reportError,
        faceDirection,
        fullString: command.fullString,
        xcoord,
        ycoord,
      },
      update(tableState, {
        reportPosition: { $set: !reportError },
      })
    )
  }

  const handleCommand = (command: CommandType): void => {
    const { baseCommand, fullString } = command
    const allowedCommands = Object.values(BaseCommandEnum) as string[]

    let cmdError = null
    if (allowedCommands.includes(baseCommand)) {
      switch (baseCommand) {
        case BaseCommandEnum.Place:
          tryPlaceRobot(command)
          break
        case BaseCommandEnum.Move:
          tryMoveRobot(command)
          break
        case BaseCommandEnum.Left:
        case BaseCommandEnum.Right:
          tryTurnRobot(command)
          break
        case BaseCommandEnum.Report:
          tryReportPosition(command)
          break
        default:
          setError(`Unhandled base command type ${baseCommand}`)
      }
    } else {
      cmdError = `Bad command, Please use one of: ${Object.values(BaseCommandEnum).join(', ')}`
      setError(cmdError)
      onCommand(
        { baseCommand, error: cmdError, fullString },
        update(tableState, {
          reportPosition: { $set: false },
        })
      )
    }
  }

  return (
    <CommandLineStyled>
      <CommandLineInputHandler error={error} onCommand={handleCommand} />
    </CommandLineStyled>
  )
}
