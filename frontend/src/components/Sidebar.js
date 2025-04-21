import React, {useEffect } from 'react';
import './Sidebar.css';
// import { Link } from 'react-router-dom';

function Sidebar ({ isOpen, setIsOpen, scrollToId}) {
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    useEffect (() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
                setIsOpen(false);
            }   
        }; 

        document.addEventListener('click', handleClickOutside);
        return () => { document.removeEventListener('click', handleClickOutside);
        }
    }, [setIsOpen]);


    return (
        <> 
            <button className="menu-button" onClick={toggleSidebar}>
                {isOpen ? 'X Close': '= Menu'}
            </button>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <li onClick={() => scrollToId("main-title")}> Dashboard</li>
                <li onClick={() => scrollToId("table-section")}> Team Table</li>
                <li onClick={() => scrollToId("graph-section")}> Chart </li>
                {/* <li onClick={() => setShowThemeModal(true)}> Change Theme </li> */}
                <li onClick={() => scrollToId("footer")}> About</li>
                {/* <a href="#" onClick={toggleSidebar}> Seasons</a> */}
            </div>

        </>
    ); 

}
    export default Sidebar;