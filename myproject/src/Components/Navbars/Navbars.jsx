import React, { useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

function Navbars() {
    const navRef = useRef();
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    let token = window.localStorage.getItem("token");
    console.log("Token value:", token);
    

    // function logoutHandler() {
    //     window.localStorage.removeItem('token');
    //     console.log('token');
    //     navigate('/login');
    //     window.location.reload();
    // }

    return (
        <div className="container-fluid p-0">
            <div className="navbars ">
                {token ? (
                    <>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">
                                    <b style={{ "color": "red" }}>TASK</b>
                                </a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="collapse navbar-collapse" float-end id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to='/Adddata'>
                                                AddData
                                            </Link>
                                        </li>
                                    

                                        <li className="nav-item">
                                            <Link className="nav-link active" onClick={logout} aria-current="page" to='/login'>
                                                LogOut
                                            </Link>
                                        </li>


                                    </ul>

                                </div>
                            </div>
                        </nav>

                    </>

                ) : (

                        <>

                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <div className="container-fluid">
                                    <a className="navbar-brand" href="#">
                                        <b style={{ "color": "red" }}>TASK</b>
                                    </a>
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent"
                                        aria-controls="navbarSupportedContent"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="navbar-toggler-icon" />
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">


                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to='/'>
                                                    Home
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to='/login'>
                                                    SignIn
                                                </Link>
                                            </li>


                                        </ul>

                                    </div>
                                </div>
                            </nav>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Navbars;
