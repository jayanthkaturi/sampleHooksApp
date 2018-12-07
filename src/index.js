import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap';

import calcReducer from './calcReducer';
import { App } from "./App";
import '../styles/App.scss';

const initialState = { prefixInput: "" };

const store = createStore(calcReducer, initialState);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
	  		<Route path="/" component={App} />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);