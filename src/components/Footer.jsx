import { getYear } from '../utilities/utilities';
import { authors } from '../global/global';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer>
            <Logo />
            <p>&copy; {getYear() + " by " + authors} </p>
        </footer>
    )
}

export default Footer