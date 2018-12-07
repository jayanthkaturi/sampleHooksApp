import React, { useState } from 'react';
import Calculator from './calc/Calculator';
// import { connect } from 'react-redux';

export function App(props) {

	return (
		<div>
			<Calculator />
		</div>
	);
}

// function mapStateToProps(state) {
// 	return state;
// }

// export const App = connect(mapStateToProps)(MyApp);