import React from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import { increment, decrement } from '../features/counterSlice.tsx';
import { useSelector } from 'react-redux';
import type { State } from '../store.tsx';



interface AppProps {

  state : State;
  dispatch : Function;

};



function Home ( props : AppProps ) : React.ReactElement {

    const { dispatch } = props;



    return (

        <>

            <div className="gridHead">

                <div>

                <h1>Vite + React</h1>

                </div>

                <div className="gridHeadSub">

                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>

                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>

                </div>

            </div> { /* End gridHead */ }



            <div className="gridMain">

                <div className="card">

                <button onClick={() => { dispatch(increment(2)) }}>
                    count is {useSelector((state : { counter : number }) => state.counter)}
                </button>

                <button onClick={() => { dispatch(decrement(3))} }>
                    count is {useSelector((state : { counter : number }) => state.counter)}
                </button>

                </div>

                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>

            </div> { /* End gridMain */ }

        </>

    );

}

export default Home;
