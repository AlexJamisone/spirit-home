import { Link } from '@chakra-ui/next-js';
import { env } from '~/env.mjs';
const AdminVisitors = () => {
	return (
		<Link
			_hover={{
				textDecoration: 'none',
				transform: 'scale(1.04)',
				bgColor: 'pink.300',
			}}
			transition="all .2s linear"
			href={env.NEXT_PUBLIC_VISITORS_LINKS}
			target="_blank"
			p={3}
			bgColor="pink.200"
			fontWeight={600}
			rounded="2xl"
			textColor="whiteAlpha.900"
		>
			Посещение
		</Link>
	);
};

export default AdminVisitors;
