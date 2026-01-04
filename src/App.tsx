import './App.css';

import NavBarComCon from './components/NavBar/NavBarComCon';
import type { RooStaObj } from './store.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import ChristmasCard from './components/ChristmasCard/ChrCarCom.tsx';
import Home from './components/Home.tsx';
import { type UseAppThu } from './hooks/useAppThu.ts'; /** This is the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing for thunk actions. */
import { type UseAppDis } from './hooks/useAppDis.ts';




interface AppProps {

  staObj : RooStaObj;
  disFun : UseAppDis;
  thuFun : UseAppThu;

};

function App( props : AppProps ) : React.ReactElement {



  const { staObj, disFun, thuFun } = props;



  return (

    <Router>

      <NavBarComCon namStr="Tech Geek" staObj={staObj} disFun={disFun} />



      <main id="main" className="gridMain">
        <Routes>
          <Route path="/" element={<Home staObj={ staObj } disFun={ disFun } thuFun={ thuFun } />} />
          <Route path="/about" element={ <About /> } />
          <Route path="/contact" element={ <Contact /> } />
          <Route path="/christmascard" element={ <ChristmasCard /> } />
        </Routes>
      </main>



      <div className="gridFoot">

        <p className="footer">
          © z4nta0 2025
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
