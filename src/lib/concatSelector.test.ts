import { concatSelecor } from './concatSelecor'

test('should make valid class string', () => {
  const result = concatSelecor('w-96 bg-white', 'shadow rounded')
  expect(result).toEqual('w-96 bg-white shadow rounded')
})
