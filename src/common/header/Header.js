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


Modal.setAppElement('#root')
const Header = function () {
    const [modalOpen, setModalOpen] = useState(false);
    function loginbuttonfunction() {
        setModalOpen(true);
    }
    return (
        <div className="headerclass" >
            <Logo />
            <LoginButton loginfunction={loginbuttonfunction} />
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
                <LoginPage />
            </Modal>


        </div>
    );
}

export default Header;