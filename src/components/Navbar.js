import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";
import '../DM.css';
import '@fortawesome/fontawesome-free/css/all.css';

export default function Navbar({ darkMode, setDarkMode }) {

    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <>
            {/* Navbar start */}
            <nav className={`flex flex-wrap items-center justify-between w-full py-4 md:px-32 md:py-2 px-4 text-lg ${darkMode ? 'text-white bg-gray-800' : 'text-black bg-blue-600'}`} >
                {/* Container for logo */}
                <div>
                    {/* link when clicking on logo */}
                    <Link to="/">
                        {/* logo looks */}
                        <img src={logo} alt="" className="h-12 w-auto rounded-full" />
                    </Link>
                </div>
                {/* menu button which only appears when device size is less than medium, check classname is svg*/}
                <button onClick={() => { setToggleMenu(!toggleMenu) }}>
                    <svg
                        xmlns="<http://www.w3.org/2000/svg>"
                        id="menu-button"
                        className="h-6 w-6 cursor-pointer md:hidden block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                {/* items in navbar */}
                <div className={`${toggleMenu ? '' : 'hidden'} w-full md:flex md:items-center md:w-auto`} id="menu">
                    <ul
                        className="
        text-base text-white
        pt-4
        md:flex
        md:justify-between
        md:pt-0"
                    >
                        <li>
                            <a className="md:p-4 py-2 block hover:text-purple-400" href="#">
                                About
                            </a>
                        </li>
                        <li>
                            <a className="md:p-4 py-2 block hover:text-purple-400" href="#">
                                Home
                            </a>
                        </li>
                        <li className='md:p-4 py-2 block'>
                            <input type="checkbox" className="checkbox" id="checkbox" onClick={() => { setDarkMode(!darkMode) }} />
                            <label for="checkbox" className="checkbox-label">
                                <i className="fas fa-sun"></i>
                                <i className="fas fa-moon"></i>
                                <span className="ball"></span>
                            </label>

                        </li>

                    </ul>
                </div>

            </nav>
        </>
    )
}
