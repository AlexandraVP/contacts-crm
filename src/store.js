import {createStore, combineReducers, applyMiddleware} from "redux";
import {contactsReducer} from './modules/contacts-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    contacts: contactsReducer
});

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
        : d => d;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);

export const store = createStore(rootReducer, enhancer);
