import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

export const useToastOnMutation = () => {
	const router = useRouter();
	const ctx = api.useContext();
	const toast = useToast();

	return {
		router,
		ctx,
		toast,
	};
};
