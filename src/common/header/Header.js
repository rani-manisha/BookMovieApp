import React, { useState } from "react";
import "./header.css";
import Logo from "../logo/Logo";
import LoginButton from "../Buttons-Login_BookShow/Loginbutton";
import BookShowButton from "../Buttons-Login_BookShow/BookShowButton";
import LoginPage from "../Modal-Login_Register/LoginModal";
import Modal from "react-modal";
import { useCookies } from 'react-cookie';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


Modal.setAppElement('#root')
const Header = function () {
    const movieID = useSelector(state => state.movieDetailsID);
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies(['']);
    const [modalOpen, setModalOpen] = useState(false);
    const [authTokenSet, setAuthTokenSet] = useState(Boolean(cookies['basic-auth']));

    //login button to open login modal 
    function handleLogin() {
        if (authTokenSet) {
            removeCookie('basic-auth');
            setAuthTokenSet(false);
        }
        else {
            setModalOpen(true);
        }
    }
    //book show button to open login modal if user not logged-in
    function handleBookShow(e) {
        if (!authTokenSet) {
            e.preventDefault();
            setModalOpen(true);
        }
    }

    //close login modal on successful login
    function handleModalClose() {
        setModalOpen(false);
        setAuthTokenSet(true);
    }
    return (
        <div className="headerclass" >
            <Logo />
            <LoginButton loginfunction={handleLogin} authTokenSet={authTokenSet} />
            <Link to={`/bookshow/${movieID}`} onClick={(e) => handleBookShow(e)} >
                {/* if movie is selected then show Book Show button */}
                {
                    movieID !== '' ?
                        <BookShowButton /> : null
                }

            </Link>

            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                    }
                }}>
                <LoginPage requestClose={handleModalClose} />
            </Modal>
        </div >
    );
}

export default Header;