import { Box, Stack, Text } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import NextLink from '~/components/NextLink';
import { footerLinks } from '~/constants/footerLinks';
import { socialLinks } from '~/constants/social';

const Footer = () => {
	const { isSignedIn } = useAuth();
	return (
		<Stack
			as={motion.footer}
			h="240px"
			bgColor="second"
			borderTopRadius="25px"
			direction="row"
			justifyContent="space-around"
			textColor="white"
			py={'50px'}
		>
			<Stack fontSize={14} as="nav">
				<Stack as="ul" listStyleType="none">
					{footerLinks(isSignedIn ?? false).map((item, idx) => (
						<Box
							as={motion.li}
							initial={{ opacity: 0, x: -100 }}
							whileInView={{
								opacity: 1,
								x: 0,
								transition: {
									type: 'spring',
									duration: 0.2 * idx,
									delay: 0.1 * idx,
									stiffness: 50,
								},
							}}
							key={item.id}
						>
							<NextLink href={item.href}>{item.label}</NextLink>
						</Box>
					))}
				</Stack>
			</Stack>
			<Stack alignItems="center" gap="38px">
				<Text>Все новости и жизнь бренда:</Text>
				<Stack direction="row" gap="38px">
					{socialLinks.map((item, idx) => (
						<Box
							key={item.href}
							as={motion.div}
							initial={{ filter: 'blur(5px)' }}
							whileInView={{
								filter: 'blur(0px)',
								transition: {
									ease: 'anticipate',
									duration: 0.2 * idx,
									delay: 0.1 * idx,
								},
							}}
						>
							<NextLink href={item.href}>
								<item.child />
							</NextLink>
						</Box>
					))}
				</Stack>
			</Stack>
			<Stack
				justifyContent="end"
				as={motion.div}
				initial={{ y: 50, filter: 'blur(5px)' }}
				whileInView={{
					y: 0,
					filter: 'blur(0px)',
					transition: {
						duration: 0.5,
						stiffness: 50,
					},
				}}
			>
				<Text>Spirit Home © {dayjs().get('year')}</Text>
			</Stack>
		</Stack>
	);
};
export default Footer;
