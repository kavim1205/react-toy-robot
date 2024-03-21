import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import App from './App'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (): any => {
  const utils = render(<App />)
  const input = utils.getByLabelText('command-input')
  return {
    input,
    ...utils,
  }
}

// test examples from the coding challenge spec sheet

test('Example A: should report Output: 0,1,NORTH', () => {
  const { getByLabelText, getByText, input } = setup()
  // command 1
  fireEvent.change(input, { target: { value: 'PLACE 0,0,NORTH' } })
  fireEvent.click(getByText('Enter'))
  // command 2
  fireEvent.change(input, { target: { value: 'MOVE' } })
  fireEvent.click(getByText('Enter'))
  // command 3
  fireEvent.change(input, { target: { value: 'REPORT' } })
  fireEvent.click(getByText('Enter'))
  expect(getByLabelText('report-output').textContent).toEqual('0,1,NORTH')
})

test('Example B: should report Output: 0,0,WEST', () => {
  const { getByLabelText, getByText, input } = setup()
  // command 1
  fireEvent.change(input, { target: { value: 'PLACE 0,0,NORTH' } })
  fireEvent.click(getByText('Enter'))
  // command 2
  fireEvent.change(input, { target: { value: 'LEFT' } })
  fireEvent.click(getByText('Enter'))
  // command 3
  fireEvent.change(input, { target: { value: 'REPORT' } })
  fireEvent.click(getByText('Enter'))
  expect(getByLabelText('report-output').textContent).toEqual('0,0,WEST')
})

test('Example C: should report Output: 3,3,NORTH', () => {
  const { getByLabelText, getByText, input } = setup()
  // command 1
  fireEvent.change(input, { target: { value: 'PLACE 1,2,EAST' } })
  fireEvent.click(getByText('Enter'))
  // command 2
  fireEvent.change(input, { target: { value: 'MOVE' } })
  fireEvent.click(getByText('Enter'))
  // command 3
  fireEvent.change(input, { target: { value: 'MOVE' } })
  fireEvent.click(getByText('Enter'))
  // command 4
  fireEvent.change(input, { target: { value: 'LEFT' } })
  fireEvent.click(getByText('Enter'))
  // command 5
  fireEvent.change(input, { target: { value: 'MOVE' } })
  fireEvent.click(getByText('Enter'))
  // command 6
  fireEvent.change(input, { target: { value: 'REPORT' } })
  fireEvent.click(getByText('Enter'))
  expect(getByLabelText('report-output').textContent).toEqual('3,3,NORTH')
})

test('Test the RIGHT command and also just check it prints in the history', () => {
  const { getByText, input } = setup()
  // command 1
  fireEvent.change(input, { target: { value: 'PLACE 2,2,EAST' } })
  fireEvent.click(getByText('Enter'))
  // command 2
  fireEvent.change(input, { target: { value: 'RIGHT' } })
  fireEvent.click(getByText('Enter'))
  // command 3
  fireEvent.change(input, { target: { value: 'MOVE' } })
  fireEvent.click(getByText('Enter'))
  // command 4
  fireEvent.change(input, { target: { value: 'REPORT' } })
  fireEvent.click(getByText('Enter'))
  expect(getByText('REPORT (2,1,SOUTH)')).toBeInTheDocument()
})
