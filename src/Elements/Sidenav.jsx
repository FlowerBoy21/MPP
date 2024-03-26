import React from "react";
import { Link } from "react-router-dom";

import './Sidenav.css';

function Sidenav() {
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    return (
        <>
            <div id="mySidenav" className="sidenav" style={{ top: '0', left: '0' }}>
                <button className="closebtn" onClick={closeNav}>&times;</button>
                <Link to="/">Home</Link>
                <Link to="/add">Add Cows</Link>
            </div>
            <span style={{ fontSize: '30px', cursor: 'pointer', position: 'absolute', top: '5px', left: '10px' }} onClick={openNav}>&#9776;</span>
        </>
    );
}

export default Sidenav;
