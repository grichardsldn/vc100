import * as fs from 'fs'

export type LineCommand = {
  line: number,
  string: string,
}

export type TextStyle = 'BIG' | 'NORMAL'

export type DisplayMessage = {
  rowIndex: number,
  columnIndex: number,
  message: string,
  boxLength: number,
  style: TextStyle,
  colour: string,
}
