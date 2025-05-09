import React, { useState} from 'react';
// import WNBAData from './components/WNBAData';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css'; //general styling



function App() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToId =(id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: "smooth"});
  };
  

  return (
    <div className= {`app  ${isOpen ? 'shifted' : ''}`}>
      <Header />
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} scrollToId={scrollToId}/>
        <MainContent isOpen={isOpen} />
        <Footer />
      </div> 
      // {/* <WNBAData /> */} 
  );
};

export default App;
