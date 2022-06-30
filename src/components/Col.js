import React, { useState } from 'react';
import '../stylesheets/columns.css';

const Col = ({ title, handleModalOpen }) => {
    const [cards, setCards] = useState([]);
    const [isInputOpen, setIsInputOpen] = useState(false);

    const handleAddCard = () => {
        setCards([...cards, 'title-target']);

    }


    return (
        <div className="columns">
            <h6 className="column-header">{title}</h6>
            {cards.map((card) => (
                <div id="cards-wrapper" onClick={() => handleModalOpen(card)}>
                    {card}
                </div>
            ))}
            {isInputOpen && (
                <> 
                    <input />
                    <button onClick={handleAddCard}> Add card </button>
                </>
            )}
            <div className="column-footer">
                <button onClick={() => setIsInputOpen(true)}>Add a card</button>
            </div>
        </div>
    )
}

export default Col;