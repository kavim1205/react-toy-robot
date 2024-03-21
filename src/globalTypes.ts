export enum BaseCommandEnum {
  Place = 'PLACE',
  Move = 'MOVE',
  Left = 'LEFT',
  Right = 'RIGHT',
  Report = 'REPORT',
}

export interface CommandType {
  baseCommand: string
  faceDirection?: RobotFaceDirectionEnum
  fullString: string
  error: string | null
  xcoord?: number
  ycoord?: number
}

export interface CommandHistoryType extends CommandType {
  order: number
}

export enum RobotFaceDirectionEnum {
  East = 'EAST',
  North = 'NORTH',
  South = 'SOUTH',
  West = 'WEST',
}

export interface TableStateType {
  gridSize: number
  faceDirection?: RobotFaceDirectionEnum
  reportPosition?: boolean
  robotIsPlaced: boolean
  xcoord?: number
  ycoord?: number
}
