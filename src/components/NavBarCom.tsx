import React from 'react';
import reactLogo from '../assets/react.svg';

interface NavBarComProps {

  name: string;
  bacEndDat: string | undefined;
  onAlertMsg1: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onAlertMsg2: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;

};

export function NavBarCom ( props : NavBarComProps ) : React.ReactElement {

    return (

        <nav className='nav-bar-sty' style={{  display: 'flex', padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
        <a onClick={props.onAlertMsg1} href="#home" data-linkname="logo" data-clickname="logoCount" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: 'white', textDecoration: 'none' }}>
            <img src={reactLogo} className="nav-log-sty" alt="React logo" />
            <p style={{ paddingLeft: '1rem' }}>{ props.name }</p>
        </a>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
            <li><a onClick={props.onAlertMsg1} data-linkname="navbar" data-clickname="homeCount" href="#home" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
            <li><a onClick={props.onAlertMsg2} data-linkname="About" data-clickindex="0" href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a></li>
            <li><a onClick={props.onAlertMsg2} data-linkname="Contact" data-clickindex="1" href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
        </ul>
        <p>{props.bacEndDat === undefined ? "Data should go here" : props.bacEndDat}</p>
        </nav>

    );

};