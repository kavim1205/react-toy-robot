import styled from 'styled-components'
import { RobotFaceDirectionEnum } from '../../globalTypes'

const Table = styled.table`
  margin: 0 auto;
`

const TableCell = styled.td`
  border: 1px solid black;
  height: 50px;
  width: 50px;
`
interface ActiveCellProps {
  faceDirection: RobotFaceDirectionEnum
}

const TableCellActive = styled.td<ActiveCellProps>`
  border: 1px solid black;
  height: 50px;
  width: 50px;

  ${(props): string | false =>
    props.faceDirection === RobotFaceDirectionEnum.East &&
    `
      background: url(/robot_east.png);
    `};

  ${(props): string | false =>
    props.faceDirection === RobotFaceDirectionEnum.North &&
    `
      background: url(/robot_north.png);
    `};

  ${(props): string | false =>
    props.faceDirection === RobotFaceDirectionEnum.South &&
    `
      background: url(/robot_south.png);
    `};

  ${(props): string | false =>
    props.faceDirection === RobotFaceDirectionEnum.West &&
    `
      background: url(/robot_west.png);
    `};
`

export { Table, TableCell, TableCellActive }
