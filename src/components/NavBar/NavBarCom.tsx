import React from 'react';
import reactLogo from '../../assets/react.svg';
import styles from './NavBarCom.module.css';
import type { State } from '../../store.tsx';

interface NavBarComProps {

  name: string;

  state: State;

  dispatch: Function;

  bacEndDat: string | undefined;

  onLogoAlert: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onHomeAlert: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onAboutAlert: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onContactAlert: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;

};

export function NavBarCom ( props : NavBarComProps ) : React.ReactElement {

    const { name, bacEndDat, onLogoAlert, onHomeAlert, onAboutAlert, onContactAlert } = props;

    return (

        <nav className={ styles.NavBarCom_nav }>
            <a className={ styles.NavBarCom_logoCon } onClick={ onLogoAlert } href="#home" data-linkname="logo" data-clickname="logoCount">
                <img src={ reactLogo } alt="React logo" />
                <p className={ styles.NavBarCom_logoTxt }>{ name }</p>
            </a>
            <p>{ bacEndDat === undefined ? "Data should go here" : bacEndDat }</p>
            <ul className={ styles.NavBarCom_ul }>
                <li><a onClick={ onHomeAlert } data-linkname="navbar" data-clickname="homeCount" href="#home" className={ styles.NavBarCom_anchor }>Home</a></li>
                <li><a onClick={ onAboutAlert } data-linkname="About" data-clickindex="0" href="#about" className={ styles.NavBarCom_anchor }>About</a></li>
                <li><a onClick={ onContactAlert } data-linkname="Contact" data-clickindex="1" href="#contact" className={ styles.NavBarCom_anchor }>Contact</a></li>
            </ul>
        </nav>

    );

};