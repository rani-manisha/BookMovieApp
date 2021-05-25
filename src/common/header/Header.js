import React, { useEffect, useState } from "react";
import "./header.css";
import Logo from "../logo/Logo";
import LoginButton from "../Login_BookShowButtons/Loginbutton";
import BookShowButton from "../Login_BookShowButtons/BookShowButton";
import LoginPage from "../Login_Register/LoginPage";
import Modal from "react-modal";
import { useCookies } from 'react-cookie';
import BookShow from '../../screens/bookshow/BookShow';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


Modal.setAppElement('#root')
const Header = function () {
    const movieID = useSelector(state => state.movieDetailsID);
    const [cookies, setCookie, removeCookie] = useCookies(['basic-auth']);
    const [modalOpen, setModalOpen] = useState(false);
    const [authTokenSet, setAuthTokenSet] = useState(Boolean(cookies['basic-auth']));
    function handleLoginFunction() {
        if (authTokenSet) {
            console.log("clear cookie");
            removeCookie('basic-auth');
            setAuthTokenSet(false);
        }
        else {
            setModalOpen(true);
        }
    }
    function handleBookShow(e) {
        if (!authTokenSet) {
            e.preventDefault();
            setModalOpen(true);
        }
    }

    function handleModalClose() {
        setModalOpen(false);
        setAuthTokenSet(true);
    }
    return (
        <div className="headerclass" >
            <Logo />
            <LoginButton loginfunction={handleLoginFunction} authTokenSet={authTokenSet} />
            <Link to={`/bookshow/${movieID}`} onClick={(e) => handleBookShow(e)} >
                {
                    movieID != '' ?
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
                        transform: 'translate(-50%, -50%)'
                    }
                }}>
                <LoginPage requestClose={handleModalClose} />
            </Modal>
        </div >
    );
}

export default Header;