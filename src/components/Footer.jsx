import { getYear } from '../utilities/utilities';
import { authors } from '../global/global';

const Footer = () => {
  return (
    <footer>
        <p>&copy; {getYear() + " " + authors} </p>
    </footer>
  )
}

export default Footer