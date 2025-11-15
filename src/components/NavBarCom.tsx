import React, { useEffect, useState } from 'react';
import reactLogo from '../assets/react.svg';

interface NavBarComProps {

  name: string;

};

/*type ClickCountObj = {

  logoCount: number;
  homeCount: number;

};*/

export const NavBarCom : React.FC<NavBarComProps> = (props) => {

  const clickCountObj : Record<string, number> = {

    logoCount: 0,
    homeCount: 0,

  };

  const [ curCouObj, setCount1 ] = useState(clickCountObj);

  const handleClick1 = ( { currentTarget } : React.MouseEvent<HTMLAnchorElement> ) => {

    if (currentTarget.hasAttribute('data-clickname')) {

      const clickname = currentTarget.getAttribute('data-clickname') as keyof typeof clickCountObj;

      setCount1 (() => {

        const prevCount : number = curCouObj[clickname];
        const newCount : number = prevCount + 1;

        return (
          { ...curCouObj, [clickname]: newCount }
        );

      });

      const linkName = currentTarget.getAttribute('data-linkname');

      alert(`You clicked on the ${linkName} link for the ${props.name} Home page ${curCouObj[clickname] + 1} times!`);

    };

  };

  const clickCountArr : number[] = [ 0, 0 ];

  const [ curCouArr, setCount ] = useState(clickCountArr);

  const handleClick2 = ( { currentTarget } : React.MouseEvent<HTMLAnchorElement> ) => {

    if (currentTarget.hasAttribute('data-clickindex')) {

      const clickIndexStr = currentTarget.getAttribute('data-clickindex') as string;
      const clickIndexNum = Number(clickIndexStr);

      setCount (() => {

        const prevCount : number = curCouArr[clickIndexNum];
        const newCount : number = prevCount + 1;

        if (clickIndexNum === 0) {

          return (
            [ newCount, curCouArr[1] ]
          );

        }

        else {

          return (
            [ curCouArr[0], newCount ]
          );

        };

      });

      const linkName = currentTarget.getAttribute('data-linkname');

      alert(`You clicked on the navbar link for the ${props.name} ${linkName} page ${curCouArr[clickIndexNum] + 1} times!`);

    };

  };

  const [ data, setData ] = useState<string>('Empty Data');

  useEffect( () => {

    alert('Fetching data from API...');

    const fetchData = async () => {

      try {

        const response = await fetch('../../mock-backend/data.json');
        const result = await response.json();
        setData(result.message);

      } catch (error) {

        setData('Error fetching data');
        console.error('Error fetching data:', error);

      }

    };

    fetchData();

  }, [] ); // Variables for dependency array (for fetching new or different data) can be added here

  return (

    <nav className='nav-bar-sty' style={{  display: 'flex', padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
      <a onClick={handleClick1} href="#home" data-linkname="logo" data-clickname="logoCount" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: 'white', textDecoration: 'none' }}>
        <img src={reactLogo} className="nav-log-sty" alt="React logo" />
        <p style={{ paddingLeft: '1rem' }}>Tech Geek</p>
      </a>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
        <li><a onClick={handleClick1} data-linkname="navbar" data-clickname="homeCount" href="#home" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
        <li><a onClick={handleClick2} data-linkname="About" data-clickindex="0" href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a></li>
        <li><a onClick={handleClick2} data-linkname="Contact" data-clickindex="1" href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
      </ul>
      <p>{data === undefined ? "Data should go here" : data}</p>
    </nav>

  );

}
