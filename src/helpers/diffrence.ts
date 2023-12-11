export function diffrence(
	current: number,
	last: number,
	precent?: number
): number {
	const commission = precent ? precent / 100 : 0;
	const cur = current * commission;
	const lst = last * commission;
	const adjustedCurrent = current + cur;
	const adjustedLast = last + lst;
	if (adjustedCurrent === 0 || adjustedLast === 0) {
		return 100;
	}
	return ((adjustedCurrent - adjustedLast) / adjustedLast) * 100;
}
