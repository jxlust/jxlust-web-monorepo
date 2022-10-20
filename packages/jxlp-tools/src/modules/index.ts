import { printWorld } from './testModule'
// import './test.css';
export function add(params: any): any {
  const text = 'text show'
  console.log(text)
  return params + 100
}
console.log('start work...')
console.log(add(1))
printWorld('jxl')
