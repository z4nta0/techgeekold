import React from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import { incNumRed, decNumRed } from '../features/counterSlice.tsx';
import useAppSel from '../hooks/useAppSel.ts'; /** This is the custom React hook that provides access to the Redux store's state with proper TypeScript typing. */
import type { RooStaObj } from '../store.tsx';
import { useEffect } from 'react';
import { loadData } from '../dataSlice.tsx';
import { type UseAppThu } from '../hooks/useAppThu.ts'; /** This is the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing for thunk actions. */
import { type UseAppDis } from '../hooks/useAppDis.ts';



interface AppProps {

  staObj : RooStaObj;
  disFun : UseAppDis;
  thuFun : UseAppThu;

};



function Home ( props : AppProps ) : React.ReactElement {

    const { staObj, disFun, thuFun } = props;

const thuDisFun = thuFun();
const appDisFun = disFun();

    useEffect( () => {

        /* Simulate loading data
        setTimeout(() => {
        disFun(loadData());
        }, 3000); */

        thuDisFun(loadData());

    }, [disFun]);

  const { isLoading } = useAppSel(( state : RooStaObj ) => state.mocDatJso);
  const { hasError }  = useAppSel(( state : RooStaObj ) => state.mocDatJso);

  const bacEndDat = isLoading ? 'Fetching data from API...' : hasError ? 'Error fetching data' : staObj.mocDatJso.data.message;



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

                    <button className="buttons" onClick={() => { appDisFun(incNumRed(2)) }}>
                        count is {useAppSel((state : RooStaObj) => state.couStaNum)}
                    </button>

                    <button className="buttons" onClick={() => { appDisFun(decNumRed(3))} }>
                        count is {useAppSel((state : RooStaObj) => state.couStaNum)}
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
