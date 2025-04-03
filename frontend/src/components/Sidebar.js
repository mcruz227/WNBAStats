import React, {useEffect } from 'react';
import './Sidebar.css';
// import { Link } from 'react-router-dom';

function Sidebar ({ isOpen, setIsOpen}) {
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
    }, [isOpen]);


    return (
        <> 
            <button className="menu-button" onClick={toggleSidebar}>
                {isOpen ? 'X Close': '= Menu'}
            </button>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <a href="#" onClick={toggleSidebar}> Home</a>
                <a href="#" onClick={toggleSidebar}> Teams</a>
                <a href="#" onClick={toggleSidebar}>  Stats</a>
                <a href="#" onClick={toggleSidebar}> Seasons</a>
            </div>

        </>
    );

}
    export default Sidebar;