import { DiscountType, ProtectionType } from "@prisma/client";
import { HTMLInputTypeAttribute } from "react";
import { DiscountInputValue, DiscountRadioValue } from "~/stores/useDiscount";
type DiscountInputs = {
    id: number
    placeholder?: string
    label: string
    name: keyof DiscountInputValue | keyof DiscountRadioValue
    type: 'input' | 'radio'
    filds?: {
        value: DiscountType | ProtectionType 
        title: string
    }[] 
    tp?: HTMLInputTypeAttribute
}

export const discounts: DiscountInputs[] = [
	{
		id: 1,
		placeholder: 'Промокод',
		label: 'Придумай промокод',
		name: 'code',
        type: 'input',
        tp: 'text'
	},
	{
		id: 2,
		label: 'Выбери тип скидки:',
		name: 'type',
        filds: [
            {value: "PROCENT", title: "Процент"},
            {value: "FIX", title: "Фиксированный"}
        ],
        type: 'radio'
	},
	{
		id: 3,
		label: 'Действует для:',
		name: 'protection',
        filds: [
            {value: "PUBCLIC", title: "Всех"},
            {value: "AUTH", title: "Зарегестрированных"},

        ],
        type: 'radio'
	},
    {
        id: 4,
        placeholder: "Величина скидки",
        label: "Сколько скидка",
        name: "value",
        type: "input",
        tp: 'number'
    }
];
