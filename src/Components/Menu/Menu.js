import {Link} from "react-router-dom";
import './Menu.css';

/**
 * This component used for displaying the Menu for navigating between Files and Upload
 * @returns {JSX.Element}
 * @constructor
 */

const Menu = () => {

    return (
        <div align='left' className='dropdown'>
            <button className='btn btn-primary' id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu
            </button>
            <div className='dropdown-menu' aria-labelledby='dLabel'>


                <Link className='dropdown-item' to={{pathname: '/Upload'}}>Upload</Link>
                <Link className='dropdown-item' to={{pathname: '/Files'}}>Files</Link>
            </div>

        </div>
    );
}

export default Menu;