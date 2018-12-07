import React, { useState } from 'react';
import * as _ from 'lodash';
import Screen from './Screen';
import CalcOperation from './CalcOperation';
import getPostFixFromInFix from '../../utils/infixToPostFix';

export default function Calculator(props) {
	const [infixInput, setInfixInput] = useState("");
	const [postFixInput, setPostFixInput] = useState("");
	const [invalidMessage, setInvalidMessage] = useState("");

	const buttons = [];
	const operators = ['+', '-', '/', '*', '(', ')'];
	const values = [..._.range(0,10), ...operators];

	_.forEach(values, (value, index) => {
		buttons.push(CalcOperation(value, infixInput, setInfixInput));
		if (index == 9) buttons.push(<br />);
	});

	return (
		<div>
			{invalidMessage ? Screen(invalidMessage) : null}
			{Screen(infixInput)}
			{postFixInput ? Screen("Post fix expression : " + postFixInput) : null}
			{buttons}
			<br />
			<button className="c-btn" onClick={() => handleReset(setInfixInput, setPostFixInput)}> Reset </button>
			<button className="c-btn" onClick={() => computeResult(infixInput, setInfixInput, setPostFixInput, setInvalidMessage)}> Compute </button>
		</div>
	);
}

function handleReset(setInfixInput, setPostFixInput) {
	setInfixInput("");
	setPostFixInput("");
}

function computeResult(infixInput, setInfixInput, setPostFixInput, setInvalidMessage) {
	const inFixTokens = _.split(infixInput, ' ');
	const inFix = _.filter(inFixTokens, (token) => (token != ""));
	const postFix = getPostFixFromInFix(inFix);
	setPostFixInput(_.join(postFix, ' '));
	setInfixInput(getResult(postFix, setPostFixInput, setInvalidMessage));
}

function getResult(tokens, setPostFixInput, setInvalidMessage) {
	const stack = [];
	_.forEach(tokens, (token) => {
		if (Number.isNaN(Number(token))) {
			const a = stack.pop();
			const b = stack.pop();
			switch(token) {
				case '+': 
					stack.push(a + b);
					break;
				case '-': 
					stack.push(b - a);
					break;
				case '/': 
					stack.push(b / a);
					break;
				case '*': 
					stack.push(a * b);
					break;
				default:
					break;
			}
		} else {
			stack.push(parseInt(token));
		}
	});
	const finalRes = (stack.length > 0) ? stack.pop() : '';
	if (Number.isNaN(finalRes)) {
		setInvalidMessage("Invalid Input");
		setPostFixInput("");
		return "";
	}
	return finalRes;
}