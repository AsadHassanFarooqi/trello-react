import React, { useState, useEffect } from 'react';
import './App.css';

// components Import
import Header from './components/Header';
import Col from './components/Col';
import Modal from './components/Modal';

// static data imports
import data from './data/data';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalDatta] = useState('');

  const handleModalOpen = (cardData) => {
    setModalDatta(cardData);
    setIsOpen(true);
  }

  const handleModalClose = () => {
    setIsOpen(false);
  }

  return (
    <div className="App">
      <Modal show={isOpen} onClose={handleModalClose}>
        <h2>{modalData}</h2>
      </Modal>
      <Header />
      <div className="column-wrapper">
        {
          data.map((item) => <Col key={item.id} title={item.title} handleModalOpen={handleModalOpen} /> )
        }
      </div>
    </div>
  );
}

export default App;
