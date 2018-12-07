import React from 'react';

export default function Screen(input) {
	if (!input) return null;
	return (
		<div className="screen">
			{input}
		</div>
	);
}