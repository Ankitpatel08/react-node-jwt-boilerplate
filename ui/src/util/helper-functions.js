export function localStorageGet(key) {
	let item = localStorage.getItem(key);

	if (!item) {
		return;
	}

	if (item[0] === '{' || item[0] === '[') {
		return JSON.parse(item);
	}

	return item;
}

export function localStorageSave(key, value) {
	if (value === undefined) {
		return new Error('Can\'t store undefinded value');
	}

	if (typeof (value) === 'object' || typeof (value) === 'array') {
		value = JSON.stringify(value);
	}

	if (typeof (value) !== 'string') {
		return new Error('Can\'t store unrecognized format value');
	}
	
	localStorage.setItem(key, value);
}

 export function localStorageRemove(key) {
	localStorage.removeItem(key);
}