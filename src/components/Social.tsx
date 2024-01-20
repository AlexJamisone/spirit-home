import { Link, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { socialLinks } from '~/constants/social';

const Social = () => {
	return (
		<Stack
			gap={5}
			as={motion.div}
			layout
			direction="row"
			boxShadow="2xl"
			p={[3, 5, 7]}
			rounded="3xl"
		>
			{socialLinks.map((link) => (
				<Link
					href={link.href}
					key={link.alt}
					target="_blank"
					as={motion.a}
					layout
					whileHover={{
						scale: 1.2,
					}}
					color="gray.600"
				>
					<link.child />
				</Link>
			))}
		</Stack>
	);
};

export default Social;
