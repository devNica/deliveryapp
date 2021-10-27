
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { loadUserFromRedux } from './redux/actions/auth';
import { PersistGate } from 'redux-persist/integration/react';
import RouterComponent from './components/router/RouterComponent';


const App = ()=>{

    useEffect(()=>{
        store.dispatch(loadUserFromRedux());
    },[])

    
    return (
        <BrowserRouter basename='/lad'>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <RouterComponent/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    );    
}

export default App;
