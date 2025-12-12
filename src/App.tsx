import './App.css';

import { NavBarComCon } from './components/NavBar/NavBarComCon';
import type { State } from './store.tsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import ChristmasCard from './components/Christmas Card/ChristmasCard.tsx';
import Home from './components/Home.tsx';



interface AppProps {

  state : State;
  dispatch : Function;

};

function App( props : AppProps ) : React.ReactElement {



  const { state, dispatch } = props;



  return (

    <Router>

      <NavBarComCon name="Tech Geek" state={state} dispatch={dispatch} />



      <main id="main">
        <Routes>
          <Route path="/" element={<Home state={ state } dispatch={ dispatch } />} />
          <Route path="/about" element={ <About /> } />
          <Route path="/contact" element={ <Contact /> } />
          <Route path="/christmascard" element={ <ChristmasCard /> } />
        </Routes>
      </main>



      <div className="gridFoot">

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more.
        </p>

      </div> { /* End gridFoot */ }

    </Router>

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
