import React, { useState } from 'react';
import col from  '../stylesheets/columns.module.css';

import Card from './Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';

const Col = ({ title, handleModalOpen, description }) => {
    const [cards, setCards] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [showAddCard, setShowAddCard] = useState(true);
    const [actionItems, setActionItems] = useState(false);

    const handleAddCard = (cardData) => {
        setCards([...cards, {
            id: '',
            title: cardData,
            description: ''
        }]);
        setShowAddCard(true);
        setIsInputOpen(false);
    }

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    }

    const handleCardCreate = (e) => {
        if (inputValue <= 0) {
            alert('Please enter title for card...');
        } else {
            handleAddCard(inputValue);
            setInputValue('');
            setActionItems(false);
            return;
        }
    }

    const handleAddCardClick = () => {
        setIsInputOpen(true);
        setShowAddCard(false);
        setActionItems(true);
    }

    const discardCardItem = () => {
        setIsInputOpen(false);
        setShowAddCard(true);
        setActionItems(false);
        setInputValue('');
    }


    return (
        <div className={col.columns}>
            <h6 className={col.columnHeader}>{title}</h6>
            <div className={col.cardsWrapper}>
            {cards.map((card) => (
                <Card cardTitle={card} cardOnClick={() => handleModalOpen(card, title)} />
            ))}
            </div>
            {isInputOpen && (
                <input
                    onChange={handleInputValue}
                    // onKeyDown={handleCardCreate}
                    placeholder="Enter a title for this card..."
                    className={col.addCardInput}
                    value={inputValue} 
                    autoFocus 
                />
            )}
            {showAddCard && (
                <div className={col.columnFooter}>
                    <button className={col.addCard} onClick={handleAddCardClick}>
                        <FontAwesomeIcon icon={faPlus} size="xs" />
                        &nbsp;
                        Add a card
                    </button>
                </div>
            )}
            {actionItems && (
                <div className={col.actionItemsWrapper}>
                    <button className={col.removeCardItem} onClick={discardCardItem}>
                        <FontAwesomeIcon icon={faBan} size="lg" />
                    </button>
                    <button className={col.addCardItem} onClick={handleCardCreate}>
                        <FontAwesomeIcon icon={faCheck} size="2x" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Col;