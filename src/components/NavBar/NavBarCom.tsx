import React from 'react';
import reactLogo from '../../assets/react.svg';
import styles from './NavBarCom.module.css';

interface NavBarComProps {

  name: string;
  bacEndDat: string | undefined;
  onAlertMsg1: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onAlertMsg2: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;

};

export function NavBarCom ( props : NavBarComProps ) : React.ReactElement {

    return (

        <nav className={styles.NavBarCom_nav}>
            <a className={styles.NavBarCom_logoCon} onClick={props.onAlertMsg1} href="#home" data-linkname="logo" data-clickname="logoCount">
                <img src={reactLogo} alt="React logo" />
                <p className={styles.NavBarCom_logoTxt}>{ props.name }</p>
            </a>
            <ul className={styles.NavBarCom_ul}>
                <li><a onClick={props.onAlertMsg1} data-linkname="navbar" data-clickname="homeCount" href="#home" className={styles.NavBarCom_anchor}>Home</a></li>
                <li><a onClick={props.onAlertMsg2} data-linkname="About" data-clickindex="0" href="#about" className={styles.NavBarCom_anchor}>About</a></li>
                <li><a onClick={props.onAlertMsg2} data-linkname="Contact" data-clickindex="1" href="#contact" className={styles.NavBarCom_anchor}>Contact</a></li>
            </ul>
            <p>{props.bacEndDat === undefined ? "Data should go here" : props.bacEndDat}</p>
        </nav>

    );

};