import React from 'react';
import reactLogo from '../../assets/react.svg';
import styles from './NavBarCom.module.css';
import type { State } from '../../store.tsx';
import { NavLink } from 'react-router-dom';

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

        <div className={ styles.gridNav }>

            <nav className={ styles.NavBarCom_nav }>

                <NavLink className={ `${styles.NavBarCom_logoCon} ${styles.NavBarCom_anchor/*({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'*/}` } onClick={ onLogoAlert } to="/" data-linkname="logo" data-clickname="logoCount">
                    <img src={ reactLogo } alt="React logo" />
                    <p className={ styles.NavBarCom_logoTxt }>{ name }</p>
                </NavLink>



                <p>{ bacEndDat === undefined ? "Data should go here" : bacEndDat }</p>



                <ul className={ styles.NavBarCom_ul }>
                    <li><NavLink onClick={ onHomeAlert } data-linkname="navbar" data-clickname="homeCount" to="/" className={ `${styles.NavBarCom_anchor} ${styles.NavBarCom_anchor/*({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'*/}` }>Home</NavLink></li>
                    <li><NavLink onClick={ onAboutAlert } data-linkname="About" data-clickindex="0" to="about" className={ `${styles.NavBarCom_anchor} ${styles.NavBarCom_anchor/*({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'*/}` }>About</NavLink></li>
                    <li><NavLink onClick={ onContactAlert } data-linkname="Contact" data-clickindex="1" to="contact" className={ `${styles.NavBarCom_anchor} ${styles.NavBarCom_anchor/*({ isActive }) => isActive? 'activeNavLink' : 'inactiveNavLink'*/}` }>Contact</NavLink></li>
                </ul>

            </nav>

        </div>

    );

};