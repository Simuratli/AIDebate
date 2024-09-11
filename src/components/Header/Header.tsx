import '../../style/components/header.scss'
import { HeaderPropTypes } from './Header.types'
const Header = ({text}:HeaderPropTypes) => {
  return (
    <h1 className='header'>{text}</h1>
  )
}

export default Header