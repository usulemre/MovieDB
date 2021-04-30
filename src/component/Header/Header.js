import React from 'react';
import './Header.css';

export default function Header() {
    return (
        <div className='header'>
            <span className='header-text' onClick={() =>(window.scroll(0,0))}>🎬MovieDB🎬</span>
        </div>
    )
}

