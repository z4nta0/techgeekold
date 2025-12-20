import React from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import { increment, decrement } from '../features/counterSlice.tsx';
import { useSelector } from 'react-redux';
import type { State } from '../store.tsx';
import { useEffect } from 'react';
import { loadData } from '../dataSlice.tsx';



interface AppProps {

  state : State;
  dispatch : Function;

};



function Home ( props : AppProps ) : React.ReactElement {

    const { state, dispatch } = props;



    useEffect( () => {

        /* Simulate loading data
        setTimeout(() => {
        dispatch(loadData());
        }, 3000); */

        dispatch(loadData());

    }, [dispatch]);

  const { isLoading } = useSelector(( state : State ) => state.loadData);
  const { hasError }  = useSelector(( state : State ) => state.loadData);

  const bacEndDat = isLoading ? 'Fetching data from API...' : hasError ? 'Error fetching data' : state.loadData.data.message;




    return (

        <section className="homeSection">

            <section className="headerSection">

                <div className="header1Div">

                    <h1 className="header1">Vite + React</h1>

                </div>

                <div className="linksDiv">

                    <a className="links" href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>

                    <a className="links" href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>

                </div>

            </section> { /* End gridHead */ }



            <section className="contentSection">

                <div className="buttonsDiv">

                    <button className="buttons" onClick={() => { dispatch(increment(2)) }}>
                        count is {useSelector((state : { counter : number }) => state.counter)}
                    </button>

                    <button className="buttons" onClick={() => { dispatch(decrement(3))} }>
                        count is {useSelector((state : { counter : number }) => state.counter)}
                    </button>

                </div>



                <p className="editParagraph">
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>



                <p className="dataParagraph">{ bacEndDat === undefined ? "Data should go here" : bacEndDat }</p>



                <p className="docsParagraph">
                    Click on the Vite and React logos to learn more.
                </p>

            </section> { /* End gridMain */ }

        </section>

    );

}

export default Home;
