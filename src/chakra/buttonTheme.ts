import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const prime = defineStyle({
	w: '637px',
	h: '56px',
	border: '2px solid',
	borderColor: '#000099',
	textColor: '#000099',
	fontSize: '18px',
	fontWeight: 600,
	backgroundColor: 'transperent',
	borderBottomRadius: '25px',
	borderTopRadius: 0,
	textTransform: 'uppercase',
	_hover: {
		backgroundColor: '#000099',
		textColor: '#EFEDED',
	},
});
export const defbtn = defineStyleConfig({
	variants: { prime },
});
