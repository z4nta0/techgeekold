import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import store from './store.tsx';
import { Provider } from 'react-redux';
import useAppThu from './hooks/useAppThu.ts'; /** This is the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing for thunk actions. */
import useAppDis from './hooks/useAppDis.ts'; /** This is the custom React hook that provides access to the Redux store's dispatch function with proper TypeScript typing for thunk actions. */



const root = createRoot(document.getElementById('root') as HTMLElement);

const render = () => {
  
  root.render(
    <StrictMode>
      <Provider store={ store } >
        <App
          staObj={ store.getState() }
          thuFun={ useAppThu }
          disFun={ useAppDis }
        />
      </Provider>
    </StrictMode>,
  );

};

render();

store.subscribe(render);
