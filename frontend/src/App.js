import React from 'react';
// import WNBAData from './components/WNBAData';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css'; //general styling


function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
      {/* <WNBAData /> */} 
    </div>
  );
};

export default App;
