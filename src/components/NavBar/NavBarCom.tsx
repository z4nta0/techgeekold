import React from 'react';
import reactLogo from '../../assets/react.svg';
import styles from './NavBarCom.module.css';
//import { useDispatch } from 'react-redux';
//import { logoCountIncrement, homeCountIncrement } from '../../store.tsx';

interface NavBarComProps {

  name: string;
  bacEndDat: string | undefined;
  onLogoAlert: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onHomeAlert: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onAboutAlert: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onContactAlert: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;

};

export function NavBarCom ( props : NavBarComProps ) : React.ReactElement {

    //const dispatch = useDispatch();

    return (

        <nav className={styles.NavBarCom_nav}>
            <a className={styles.NavBarCom_logoCon} onClick={props.onLogoAlert} href="#home" data-linkname="logo" data-clickname="logoCount">
                <img src={reactLogo} alt="React logo" />
                <p className={styles.NavBarCom_logoTxt}>{ props.name }</p>
            </a>
            <ul className={styles.NavBarCom_ul}>
                <li><a onClick={props.onHomeAlert} data-linkname="navbar" data-clickname="homeCount" href="#home" className={styles.NavBarCom_anchor}>Home</a></li>
                <li><a onClick={props.onAboutAlert} data-linkname="About" data-clickindex="0" href="#about" className={styles.NavBarCom_anchor}>About</a></li>
                <li><a onClick={props.onContactAlert} data-linkname="Contact" data-clickindex="1" href="#contact" className={styles.NavBarCom_anchor}>Contact</a></li>
            </ul>
            <p>{props.bacEndDat === undefined ? "Data should go here" : props.bacEndDat}</p>
        </nav>

    );

};