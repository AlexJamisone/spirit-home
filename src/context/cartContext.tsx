import { createContext, type Dispatch, useContext, useReducer } from 'react';
import {
	cartReducer,
	type CartAction,
	type CartState,
	initialState,
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
