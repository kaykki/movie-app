import { appTitle } from '../global/global'
import Nav from './Nav'

const Header = () => {
  return (
    <header>
        <h1>{appTitle}</h1>
        <Nav />
    </header>
  )
}

export default Header