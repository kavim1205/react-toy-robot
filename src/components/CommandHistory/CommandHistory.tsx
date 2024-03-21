import React from 'react'
import { BaseCommandEnum } from '../../globalTypes'
import type { CommandHistoryType } from '../../globalTypes'
import { ErrorItemStyled, ItemStyled } from './CommandHistoryStyles'

interface PropsType {
  commands?: CommandHistoryType[]
}

export const CommandHistory: React.FC<PropsType> = (props) => {
  const { commands } = props
  return (
    <div className="history">
      <h3>Command history:</h3>
      {(!commands || commands.length === 0) && <p>No History</p>}
      {commands && (
        <ol>
          {commands.map((cmd: CommandHistoryType) => {
            return cmd.error ? (
              <ErrorItemStyled key={cmd.order}>{`${cmd.fullString} (${cmd.error})`}</ErrorItemStyled>
            ) : (
              <ItemStyled key={cmd.order}>
                {cmd.fullString}{' '}
                {cmd.baseCommand === BaseCommandEnum.Report && `(${cmd.xcoord},${cmd.ycoord},${cmd.faceDirection})`}
              </ItemStyled>
            )
          })}
        </ol>
      )}
    </div>
  )
}
