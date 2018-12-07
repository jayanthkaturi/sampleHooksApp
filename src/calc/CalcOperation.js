import React, {useState} from "react";

export default function CalcOperation(value, infixInput, setInfixInput) {
	return (
		<button className="op-btn" onClick={() => handleButtonClick(value, infixInput, setInfixInput)} >
			{value}
		</button>
	); 
}

function handleButtonClick(value, infixInput, setInfixInput) {
	let result = infixInput;
	if (Number.isNaN(Number(value))) { result += ' ' + value.toString() + ' '; }
	else { result += value.toString(); }
	setInfixInput(result);
}