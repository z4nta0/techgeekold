import React from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '../../assets/vite.svg';
import { incNumRed, decNumRed } from '../../features/counterSlice.tsx';
import useAppSel from '../../hooks/useAppSel.ts'; /** This is the custom React hook that provides access to the Redux store's state with proper TypeScript typing. */
import type { RooStaObj } from '../../store.tsx';
import { useEffect } from 'react';
import { getMocDatJso } from '../../api/dataSlice.tsx';
import { type UseAppThu } from '../../hooks/useAppThu.ts'; /** This is the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing for thunk actions. */
import { type UseAppDis } from '../../hooks/useAppDis.ts';
import styles from './HomPagCom.module.css';



interface AppProps {

  staObj : RooStaObj;
  disFun : UseAppDis;
  thuFun : UseAppThu;

};



function Home ( props : AppProps ) : React.ReactElement {

    const { disFun, thuFun } = props;

const thuDisFun = thuFun();
const appDisFun = disFun();

    useEffect( () => {

        /* Simulate loading data
        setTimeout(() => {
        disFun(loadData());
        }, 3000); */

        thuDisFun(getMocDatJso());

    }, [disFun]);

  const { curLoaBoo } = useAppSel(( state : RooStaObj ) => state.mocDatJso);
  const { encErrBoo } = useAppSel(( state : RooStaObj ) => state.mocDatJso);
  const { mocDatStr } = useAppSel(( state : RooStaObj ) => state.mocDatJso.mocDatObj);

  const bacEndDat = curLoaBoo ? 'Fetching data from API...' : encErrBoo ? 'Error fetching data' : mocDatStr;



    return (

        <section className={styles.homeSection}>

            <section className={styles.headerSection}>

                <div className={styles.header1Div}>

                    <h1 className={styles.header1}>Vite + React</h1>
                </div>

                <div className={styles.linksDiv}>

                    <a className={styles.links} href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className={styles.logo} alt="Vite logo" />
                    </a>

                    <a className={styles.links} href="https://react.dev" target="_blank">
                        <img src={reactLogo} className={styles.logo + ' ' + styles.react} alt="React logo" />
                    </a>

                </div>

            </section> { /* End gridHead */ }



            <section className={styles.contentSection}>
                <div className={styles.buttonsDiv}>

                    <button className={styles.buttons} onClick={() => { appDisFun(incNumRed(2)) }}>
                        count is {useAppSel((state : RooStaObj) => state.couStaNum)}
                    </button>

                    <button className={styles.buttons} onClick={() => { appDisFun(decNumRed(3))} }>
                        count is {useAppSel((state : RooStaObj) => state.couStaNum)}
                    </button>

                </div>



                <p className={styles.editParagraph}>
                    Edit <code>src/App.tsx</code> and save to test HMR
                    <a href="https://react.dev" target="_blank" className={styles.learnLink}>Learn React</a>
                </p>



                <p className={styles.dataParagraph}>{ bacEndDat === undefined ? "Data should go here" : bacEndDat }</p>



                <p className={styles.docsParagraph}>
                    Click on the Vite and React logos to learn more.
                </p>

            </section> { /* End gridMain */ }

        </section>

    );

}

export default Home;
