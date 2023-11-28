import type { HTMLInputTypeAttribute } from 'react';

type CategoryInputs = {
	id: number;
	label: string;
	placeholder: string;
	type: HTMLInputTypeAttribute;
	name: 'title' | 'path';
	helper?: string;
};

export function categoryInputs(
	type: 'category' | 'subCategory'
): CategoryInputs[] {
	switch (type) {
		case 'category': {
			return [
				{
					id: 1,
					label: 'Категория',
					placeholder: 'Одежда',
					name: 'title',
					type: 'text',
				},
				{
					id: 2,
					label: 'Путь',
					placeholder: 'Например: cloth',
					helper: '* Обязательно на английском языке',
					name: 'path',
					type: 'text',
				},
			];
		}
		case 'subCategory': {
			return [
				{
					id: 3,
					label: 'Подкатегория',
					name: 'title',
					placeholder: 'Придумай подкатегорию',
					type: 'text',
				},
				{
					id: 4,
					label: 'Путь подкатегории',
					name: 'path',
					placeholder: 'Например: rings',
					type: 'text',
					helper: '* На английском языке',
				},
			];
		}
	}
}
[];
