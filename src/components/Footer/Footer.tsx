import '../../style/components/footer.scss'
import { Button, Input } from '..'
import {useStore} from '../../store'
import { FooterPropTypes } from './Footer.types'

const Footer = ({onClick}:FooterPropTypes) => {
  const {setDebateText,debateText}  = useStore()
  return (
    <div className='footer'>
      {/* <div className="footer__header">
        <Header text={'Create Debate between AI'} />
      </div>       */}
      <div className="footer__content">
        <Input onChange={(e)=>{setDebateText(e.target.value)}} placeholder='Start Debate About....' value={debateText} />
        <Button onClick={onClick} text='Start' />
      </div>
    </div>
  )
}

export default Footer