import { add, reduceOne } from '../src/add'
describe('add func', () => {
  //测试用例
  it('1+1', () => {
    expect(add(1, 1)).toEqual(2)
  })
  it('0+0', () => {
    expect(add(0, 0)).toEqual(0)
  })
})

describe('reduceOne func', () => {
  //测试用例
  it('- 1', () => {
    expect(reduceOne(1)).toEqual(0)
  })
  it('- 0', () => {
    expect(reduceOne(0)).toEqual(-1)
  })
})
