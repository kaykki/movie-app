import { Link } from "react-router-dom"
import { appTitle } from '../global/global';
import logo from '/assets/images/seenema-logo.svg'

function Logo() {
    return (
        <Link className='logo' to="/">
            <img src={logo} alt="Seenema Logo" />
            <h1>{appTitle}</h1>
        </Link>
    )
}

export default Logo