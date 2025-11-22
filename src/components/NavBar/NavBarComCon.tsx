import React, { useEffect, useState } from 'react';
import { NavBarCom } from './NavBarCom';
import { store } from '../../store';
import { navClickIncrement } from '../../store.tsx';

interface NavBarComConProps {

  name: string;

};

/* Leaving this for future reference
type ClickCountObj = {

  logoCount: number;
  homeCount: number;

};
*/

export function NavBarComCon ( props : NavBarComConProps ) : React.ReactElement {

/* Leaving these old useState and handlers for future reference

  interface ClickCountObj {

    logoCount: number;
    homeCount: number;

  };

  const clickCountObj : ClickCountObj = {

    logoCount: 0,
    homeCount: 0,

  };

  const [ curCouObj, setCount1 ] = useState<ClickCountObj>(clickCountObj);

  const handleClick1 = ( { currentTarget } : React.MouseEvent<HTMLAnchorElement> ) => {

    if (currentTarget.hasAttribute('data-clickname')) {

      const clickname = currentTarget.getAttribute('data-clickname') as keyof typeof clickCountObj;

      setCount1 ((prevState) => {

        const prevCount : number = prevState[clickname];
        const newCount : number = prevCount + 1;

        return { ...prevState, [clickname]: newCount };

      });

      const linkName : string | null = currentTarget.getAttribute('data-linkname');

      alert(`You clicked on the ${linkName} link for the ${props.name} Home page ${curCouObj[clickname] + 1} times!`);

    };

  };

  type ClickCountArr = [number, number];
  const clickCountArr : ClickCountArr = [ 0, 0 ];

  const [ curCouArr, setCount ] = useState<ClickCountArr>(clickCountArr);

  const handleClick2 = ( { currentTarget } : React.MouseEvent<HTMLAnchorElement> ) => {

    if (currentTarget.hasAttribute('data-clickindex')) {

      const clickIndexStr : string = currentTarget.getAttribute('data-clickindex') as string;
      const clickIndexNum : number = Number(clickIndexStr);

      setCount ((prevState) => {

        const prevCount : number = prevState[clickIndexNum];
        const newCount : number = prevCount + 1;

        if (clickIndexNum === 0) {

          return [ newCount, prevState[1] ];

        }

        else {

          return [ prevState[0], newCount ];

        };

      });

      const linkName : string | null = currentTarget.getAttribute('data-linkname');

      alert(`You clicked on the navbar link for the ${props.name} ${linkName} page ${curCouArr[clickIndexNum] + 1} times!`);

    };

  };
*/



  const handleLogoClick = () => {

    store.dispatch(navClickIncrement( 'clickCountObj/logoCount' ));

    const logoCount = store.getState().clickCountObj.logoCount;

    alert(`You clicked on the logo link for the ${props.name} Home page ${logoCount} times!`);

  };



  const handleHomeClick = () => {

    store.dispatch(navClickIncrement( 'clickCountObj/homeCount' ));

    const homeCount = store.getState().clickCountObj.homeCount;

    alert(`You clicked on the navbar link for the ${props.name} Home page ${homeCount} times!`);

  };



  const handleAboutClick = () => {

    store.dispatch(navClickIncrement( 'clickCountArr/aboutCount' ));

    const aboutCount = store.getState().clickCountArr[0];

    alert(`You clicked on the navbar link for the ${props.name} About page ${aboutCount} times!`);

  };



  const handleContactClick = () => {

    store.dispatch(navClickIncrement( 'clickCountArr/contactCount' ));

    const contactCount = store.getState().clickCountArr[1];

    alert(`You clicked on the navbar link for the ${props.name} Contact page ${contactCount} times!`);

  };



  const [ data, setData ] = useState<string>('Empty Data');

  useEffect( () => {

    alert('Fetching data from API...');

    const fetchData = async () => {

      try {

        interface Response {

          message: string;

        };

        const response = await fetch('../../mock-backend/data.json');
        const result : Response = await response.json();

        setData(result.message);

      } catch (error) {

        setData('Error fetching data');
        console.error('Error fetching data:', error);

      }

    };

    fetchData();

  }, [] ); // Variables for dependency array (for fetching new or different data) can be added here

  return (

    <>

      <NavBarCom name={props.name} bacEndDat={data} onLogoAlert={handleLogoClick} onHomeAlert={handleHomeClick} onAboutAlert={handleAboutClick} onContactAlert={handleContactClick} />
    
    </>

  );

};
