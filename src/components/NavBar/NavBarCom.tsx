import React from 'react';
import reactLogo from '../../assets/react.svg';
import styles from './NavBarCom.module.css';
import type { State } from '../../store.tsx';
import { NavLink } from 'react-router-dom';

interface NavBarComProps {

  namStr: string;

  staObj: State;

  disFun: Function;

  onLogoClick: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onHomeClick: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onAboutClick: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;
  onContactClick: ( e : React.MouseEvent<HTMLAnchorElement> ) => void;

};

export function NavBarCom ( props : NavBarComProps ) : React.ReactElement {

    const { namStr, onLogoClick, onHomeClick, onAboutClick, onContactClick } = props;

    return (

        <div className={ styles.gridNav }>

            <nav className={ styles.NavBarCom_nav }>

                <NavLink className={ `${styles.NavBarCom_logoCon} ${styles.NavBarCom_anchor/*({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'*/}` } onClick={ onLogoClick } to="/" data-linkname="logo" data-clickname="logoCount">
                    <img src={ reactLogo } alt="React logo" />
                    <p className={ styles.NavBarCom_logoTxt }>{ namStr }</p>
                </NavLink>



                <ul className={ styles.NavBarCom_ul }>
                    <li><NavLink onClick={ onHomeClick } data-linkname="navbar" data-clickname="homeCount" to="/" className={ `${styles.NavBarCom_anchor} ${styles.NavBarCom_anchor/*({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'*/}` }>Home</NavLink></li>
                    <li><NavLink onClick={ onAboutClick } data-linkname="About" data-clickindex="0" to="about" className={ `${styles.NavBarCom_anchor} ${styles.NavBarCom_anchor/*({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'*/}` }>About</NavLink></li>
                    <li><NavLink onClick={ onContactClick } data-linkname="Contact" data-clickindex="1" to="contact" className={ `${styles.NavBarCom_anchor} ${styles.NavBarCom_anchor/*({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'*/}` }>Contact</NavLink></li>
                </ul>

            </nav>

        </div>

    );

};