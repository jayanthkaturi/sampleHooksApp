import * as _ from 'lodash';

const RANKS = {
	'/': 0,
	'*': 1,
	'+': 2,
	'-': 3
};

export default function getPostFixFromInFix(infix) {
	const stack = [];
	const res = [];
	_.forEach(infix, (token) => {
		if (token == '(') stack.push(token);
		else if (token == ')') {
			while (stack.length > 0 && stack[stack.length - 1] != '(') {
				res.push(stack.pop());
			}
			if (stack.length > 0) stack.pop();
		} else if (token in RANKS) {
			while (stack.length > 0 && RANKS[stack[stack.length - 1]] < RANKS[token] && stack[stack.length -1] != '(') {
				res.push(stack.pop());
			}
			stack.push(token);
		} else res.push(token);
	});
	while (stack.length > 0) res.push(stack.pop());
	return res;
}