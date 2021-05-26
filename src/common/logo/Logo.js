import React from "react";
import "./logo.css";
import logo1 from "./logo.svg";

const Logo = function () {
    return (
        <div className="logoclass">
            <img src={logo1} alt="logo" />
        </div>
    );
}
export default Logo;