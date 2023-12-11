import dayjs from 'dayjs';
import { create } from 'zustand';
dayjs().format();

type DateState = {
	isDate: boolean;
	send: Date[];
	selectedDate: Date[];
};

type DateAction = {
	setSend: (date: Date[]) => void;
	setSelectedDate: (date: Date[]) => void;
	setIsDate: (isDate: boolean) => void;
};

type DateRange = DateState & DateAction;
const initial: DateState = {
	isDate: false,
	selectedDate: [
		dayjs().startOf('month').toDate(),
		dayjs().endOf('month').toDate(),
	],
	send: [],
};
export const useDateRange = create<DateRange>((set) => ({
	...initial,
	setIsDate: (isDate) => set({ isDate }),
	setSelectedDate: (date) => set({ selectedDate: date }),
	setSend: (date) => set({ send: date }),
}));
