import React, {useState, useEffect} from 'react';
import './MainContent.css';

const MainContent = ( { isOpen} ) => {
    const [data, setData] = useState([]);
    useEffect 
    return (
        <main className= {`main-content  ${isOpen ? 'shifted' : ''}`}>
            <h2> Welcome to WNBA ANaltics name holder</h2>
            <p> data data data will be desplayed like team stats, etc.</p>
        </main>
    );
};

export default MainContent;