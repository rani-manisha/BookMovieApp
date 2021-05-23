import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./header.css";
//import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from "./Logo";
import LoginButton from "../Login_LogoutButtons/Loginbutton";
import LoginPage from "../Login_Register/LoginPage";
import { Button } from 'react-bootstrap'
import Home from "../../screens/home/Home"
import Modal from "react-modal";
import { useCookies } from 'react-cookie';


Modal.setAppElement('#root')
const Header = function () {
    const [cookies, setCookie, removeCookie] = useCookies(['basic-auth']);
    const [modalOpen, setModalOpen] = useState(false);
    const [authTokenSet, setAuthTokenSet] = useState(Boolean(cookies['basic-auth']));
    function loginbuttonfunction() {
        if (authTokenSet) {
            console.log("clear cookie");
            removeCookie('basic-auth');
            setAuthTokenSet(false);
        }
        else {
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
            <LoginButton loginfunction={loginbuttonfunction} authTokenSet={authTokenSet} />
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}
                style={
                    {

                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            transform: 'translate(-50%, -50%)'
                        }

                    }

                }
            >
                {/* <button onclick={()=>setModalOpen(false)} >Close</button> */}
                <LoginPage requestClose={handleModalClose} />
            </Modal>


        </div>
    );
}

export default Header;