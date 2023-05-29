import { Icon, Link, Stack } from '@chakra-ui/react';
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
			p={7}
			rounded="3xl"
		>
			{socialLinks.map(({ alt, href, icon, color }) => (
				<Link
					href={href}
					key={alt}
					target="_blank"
					as={motion.a}
					layout
					whileHover={{
						scale: 1.2,
						color,
					}}
					color="gray.600"
				>
					<Icon as={icon} boxSize={12} />
				</Link>
			))}
		</Stack>
	);
};

export default Social;
