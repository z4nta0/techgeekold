import React from 'react';
import reactLogo from '../assets/react.svg';

interface NavBarComProps {

  name: string;

};

export const NavBarCom : React.FC<NavBarComProps> = (props) => {

  const handleClick1 = () => {

    alert(`You clicked on the logo link for the ${props.name} Home page!`);

  };

  const handleClick2 = () => {

    alert(`You clicked on the nav link for the ${props.name} Home page!`);

  };

  const handleClick3 = () => {

    alert(`You clicked on the nav link for the ${props.name} About page!`);

  };

  const handleClick4 = () => {

    alert(`You clicked on the nav link for the ${props.name} Contact page!`);

  };

  return (

    <nav className='nav-bar-sty' style={{  display: 'flex', padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
      <a onClick={handleClick1} href="#home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: 'white', textDecoration: 'none' }}>
        <img src={reactLogo} className="nav-log-sty" alt="React logo" />
        <p style={{ paddingLeft: '1rem' }}>Tech Geek</p>
      </a>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
        <li><a onClick={handleClick2} href="#home" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
        <li><a onClick={handleClick3} href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a></li>
        <li><a onClick={handleClick4} href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
      </ul>
    </nav>

  );

}
