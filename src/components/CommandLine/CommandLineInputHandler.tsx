import React, { useState } from 'react'
import {
  CommandLineButtonStyled,
  CommandLineErrorStyled,
  CommandLineInputStyled,
  CommandLineLabelStyled,
} from './CommandLineStyles'
import type { CommandType } from '../../globalTypes'

interface PropsType {
  error: string | null
  onCommand: (command: CommandType) => void
}

export const CommandLineInputHandler: React.FC<PropsType> = (props) => {
  const { error, onCommand } = props

  const [command, setCommand] = useState('')

  const issueCommand = (): void => {
    const [baseCommand, xcoord, ycoord, faceDirection] = command.trim().toUpperCase().split(/[ ,]+/)

    const parsedCommand = {
      baseCommand,
      error: null,
      faceDirection: faceDirection || undefined,
      fullString: command,
      xcoord: xcoord ? parseInt(xcoord, 10) : undefined,
      ycoord: ycoord ? parseInt(ycoord, 10) : undefined,
    } as CommandType

    onCommand(parsedCommand)
    setCommand('')
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      issueCommand()
    }
  }

  const updateCommand = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCommand(event.target.value)
  }

  return (
    <>
      <CommandLineLabelStyled htmlFor="command-input">
        <p>Please type your commands here:</p>
        {error && <CommandLineErrorStyled aria-label="error-message">{error}</CommandLineErrorStyled>}
        <CommandLineInputStyled
          aria-label="command-input"
          id="command-input"
          onChange={updateCommand}
          onKeyPress={handleEnterPress}
          placeholder="enter command"
          type="text"
          value={command}
        />
      </CommandLineLabelStyled>
      <CommandLineButtonStyled type="button" onClick={issueCommand}>
        Enter
      </CommandLineButtonStyled>
    </>
  )
}
