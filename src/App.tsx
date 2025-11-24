import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { NavBarComCon } from './components/NavBar/NavBarComCon';
import { increment, decrement } from './features/counterSlice.tsx';
import { useSelector } from 'react-redux';
import type { State } from './store.tsx';



interface AppProps {

  state : State;
  dispatch : Function;

};

function App( props : AppProps ) : React.ReactElement {



  const { state, dispatch } = props;



  return (
    <>
      <div>
        <NavBarComCon name="Tech Geek" state={state} dispatch={dispatch} />
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => { dispatch(increment(2)) }}>
          count is {useSelector((state : { counter : number }) => state.counter)}
        </button>
        <button onClick={() => { dispatch(decrement(3))} }>
          count is {useSelector((state : { counter : number }) => state.counter)}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more. Netlify testing...
      </p>
    </>
  );



/*
  <
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
*/



}

export default App
