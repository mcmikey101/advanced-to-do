import React from 'react';
import { useState } from 'react';
export default function NavBar(props) {
    return(
    <>
        <div className='navbar'>
            <button onClick={() => props.setPage('home')}>Home</button>
            <div className="navbarname"><p>{props.login}</p></div>
            <button onClick={() => props.setPage('signin')} className='navbarbtn'>Account</button>
        </div>
    </>
    )
}