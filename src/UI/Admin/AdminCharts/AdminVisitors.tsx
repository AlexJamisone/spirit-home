import { Button, Link } from '@chakra-ui/react';
import { env } from '~/env.mjs';

const AdminVisitors = () => {
	return (
		<Link
			as={Button}
			href={env.NEXT_PUBLIC_VISITORS_LINKS}
			target="_blank"
			_hover={{
				textDecoration: 'none',
				bgColor: 'brandLight',
			}}
			bgColor="brand"
		>
			Посещение
		</Link>
	);
};

export default AdminVisitors;
