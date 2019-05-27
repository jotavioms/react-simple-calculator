import React from 'react';
import './Button.css';

export default props => 
    <button
        onClick={() => props.click && props.click(props.label)} 
        className={`
            button
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}>
        {props.label}
    </button>


// Lógica para saber se click está definido antes de tentar
// chamar uma função que pode não existir e acusar erro
// ...
// onClick={() => props.click && props.click(props.label)} 
// ...