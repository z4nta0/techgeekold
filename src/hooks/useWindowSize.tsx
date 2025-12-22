
import { useEffect } from 'react';
import { useState }  from 'react';



const useWindowSize = () => {

    const [ windowSize, setWindowSize ] = useState({

        winHeiNum : window.innerHeight,
        winWidNum : window.innerWidth,

    });



    useEffect(() => {

        const hanResFun = () => {

            setWindowSize({

                winHeiNum : window.innerHeight,
                winWidNum : window.innerWidth,

            });

        };



        window.addEventListener( 'resize', hanResFun );



        // Clean up the event listener on component unmount
        return () => {

            window.removeEventListener( 'resize', hanResFun );

        };

    }, []);



    return windowSize;

};

export default useWindowSize;


