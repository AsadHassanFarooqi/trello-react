import React from 'react'

import './Chip.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Chip({text, color, closeIcon, removeChip}) {
  return (
    <div className="chip" style={{backgroundColor: color}}>
        {text}
        {closeIcon && <button className="close" onClick={() => removeChip()}><FontAwesomeIcon icon={faClose} /></button> }
    </div>
  )
}

export default Chip;