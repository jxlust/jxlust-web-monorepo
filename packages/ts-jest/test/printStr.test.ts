import { printStr } from '../src/print'
describe('printStr fun', () => {
  //用例
  it('hello', () => {
    expect(printStr('xiaoli')).toBe('Hello,xiaoli')
  })
})
