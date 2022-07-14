import React from 'react';
import card from '../stylesheets/card.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const avatarUrl = [
    {
        id: 0,
        url: "https://trello-members.s3.amazonaws.com/5e37f0ee66a5166ba044f36f/b25b900e834dc2a8f1659049bd10b6c4/50.png"
    },
    {
        id: 1,
        url: "https://trello-members.s3.amazonaws.com/5d23047f5f9fb67311528f06/a504ad34f00f369553e5fdeb70e7fed0/50.png"
    },
    {
        id: 2,
        url: "https://trello-members.s3.amazonaws.com/5f191ef0fb7b6957d3e7c305/ba52956c6e33e4751ad28c690685affe/50.png"
    }
    
    
    
];

const Card = ({cardTitle, cardOnClick}) => {
    return (
        <div className={card.wrapper} onClick={cardOnClick}>
            <p className={card.title}>{cardTitle.title}</p>
            <div className={card.footer}>
                <span className={card.badge}>
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <div className={card.avatar}>
                    {avatarUrl.map(avatar => {
                        <img src={avatar.url} class={card.avatar} alt={cardTitle} key={avatar.id} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Card;