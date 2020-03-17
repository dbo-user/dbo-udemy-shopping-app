import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'; // Store is a place in memory that stores all the state
import { Provider } from 'react-redux'; // line 41
import { AppLoading } from 'expo'; // prolongs splash screen until fonts are loaded
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk'; // it is middleware that looks at every action that passes through the system, and if it’s a function, it calls that function.

import productsReducer from './store/reducers/products'; // reducers are like cashiers in a bank
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({ // combine all the reducers to create the store on line 18
  products: productsReducer, // products is the key for productsReducer
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); // Store(bank vault) is a place in memory that stores all the state

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return ( // Provider gives the entire App access to the store which holds all the state
    <Provider store={store} /*line 18*/>
      <ShopNavigator /*ShopNavigator.js navigation structure, opening screen is ProductsOverview*/ /> 
    </Provider>
  );
}
