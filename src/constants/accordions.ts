import type { HTMLInputTypeAttribute } from 'react';
import type { AccordionState } from '~/stores/useAccordion';

type AccordionInputType = {
	id: number;
	placeholder: string;
	label: string;
	type: HTMLInputTypeAttribute;
	isTextArea: boolean;
	name: keyof AccordionState['input'];
};

export const accordionsInput: AccordionInputType[] = [
	{
		id: 1,
		placeholder: 'Придумай название вопроса',
		label: 'Вопрос',
		type: 'text',
		isTextArea: false,
		name: 'title',
	},
	{
		id: 2,
		placeholder: 'Укажи ответ',
		label: 'Ответ',
		type: 'text',
		isTextArea: true,
		name: 'content',
	},
];
