import '../../style/components/button.scss'
import { ButtonPropTypes } from './Button.types'

const Button = ({ onClick, text }: ButtonPropTypes) => {
    return (
        <button className='button' onClick={onClick}>{text}</button>
    )
}

export default Button