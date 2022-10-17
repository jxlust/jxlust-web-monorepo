import { fetchData } from '../src/asyncFunc'
test('fetch data', async () => {
  expect.assertions(1)
  try {
    const result = await fetchData(91)
    expect(result).toBe(99)
  } catch (error) {
    expect(error).toMatch('error')
  }
})

test('fetch data2', async () => {
  expect.assertions(2)
  await expect(fetchData(9)).resolves.toBe(99)
  await expect(fetchData(11)).rejects.toMatch('error1')
})
