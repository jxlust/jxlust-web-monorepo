import { ExtractPropTypes } from 'vue'
import Button from './index.vue'
export const buttonProps = {
  text: String,
}
import './index.scss'
export type ButtonPropsType = ExtractPropTypes<typeof buttonProps>
// Button.installl = (App) => {
//   App.component(Button.name, Button)
// }
export default Button
