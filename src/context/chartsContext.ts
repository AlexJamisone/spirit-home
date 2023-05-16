import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
} from 'react';

type ChartsContextProps = {
	orders:
		| {
				data: {
					date: string;
					Заказы: number;
					'\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u044B': number;
					Выручка: number;
				}[];
				today: number;
				todayDifrByDay: number;
				jamison: number;
				todayDifrByJamison: number;
				monthRevenue: number;
		  }
		| undefined;
	selectedDate: Date[];
	setSelectedDate: Dispatch<SetStateAction<Date[]>>;
	isDate: boolean;
	setIsDate: Dispatch<SetStateAction<boolean>>;
	send: Date[];
	setSend: Dispatch<SetStateAction<Date[]>>;
};

const ChartsContext = createContext<ChartsContextProps | null>(null);

export function useChartsContext() {
	const context = useContext(ChartsContext);
	if (!context)
		throw new Error(
			'Charts.* component must be render as a child of Charts comopnent'
		);
	return context;
}

export default ChartsContext;
