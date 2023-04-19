import { createContext, useContext, useReducer, type Dispatch } from 'react';
import {
	cartReducer,
	initialState,
	type CartAction,
	type CartState,
} from '~/reducer/CartReducer';

type CartContextType = {
	cartState: CartState;
	cartDispatch: Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType>({
	cartState: initialState,
	cartDispatch: () => null,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

	return (
		<CartContext.Provider value={{ cartState, cartDispatch }}>
			{children}
		</CartContext.Provider>
	);
};
