export const getFromLocalStorage = <T>(key: string): T | null => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const json = window.localStorage.getItem(key);
		if (json) {
			return JSON.parse(json) as T;
		}
	}
	return null;
};
export const saveToLocalStorage = <T>(item: T, key: string) => {
	if (typeof window !== 'undefined' && window.localStorage) {
		window.localStorage.setItem(key, JSON.stringify(item));
	}
};
