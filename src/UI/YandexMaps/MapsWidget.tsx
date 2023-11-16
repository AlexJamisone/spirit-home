import { Stack, useMediaQuery } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MapsWidget = () => {
	const [isLowerThan650, isLowerThan420] = useMediaQuery([
		'(max-width: 650px)',
		'(max-width: 420px)',
	]);
	return (
		<Stack
			as={motion.div}
			layout
			initial={{ opacity: 0, filter: 'blur(5px)' }}
			overflow="hidden"
			position="relative"
			animate={{
				opacity: 1,
				filter: 'blur(0px)',
				transition: { type: 'spring', duration: 1, delay: 0.5 },
			}}
			boxShadow="2xl"
			rounded="3xl"
		>
			<a
				href="https://yandex.ru/maps/org/spirit_home/102608086843/?utm_medium=mapframe&utm_source=maps"
				style={{
					color: '#eee',
					fontSize: '12px',
					position: 'absolute',
					top: '0px',
				}}
			>
				Spirit Home
			</a>
			<a
				href="https://yandex.ru/maps/959/sevastopol/category/gift_and_souvenir_shop/184108001/?utm_medium=mapframe&utm_source=maps"
				style={{
					color: '#eee',
					fontSize: '12px',
					position: 'absolute',
					top: '14px',
				}}
			>
				Магазин подарков и сувениров в Севастополе
			</a>
			<a
				href="https://yandex.ru/maps/959/sevastopol/category/clothing_store/184107943/?utm_medium=mapframe&utm_source=maps"
				style={{
					color: '#eee',
					fontSize: '12px',
					position: 'absolute',
					top: '28px',
				}}
			>
				Товары для творчества и рукоделия в Севастополе
			</a>
			<iframe
				src="https://yandex.ru/map-widget/v1/?ll=33.525656%2C44.605631&mode=poi&poi%5Bpoint%5D=33.525656%2C44.605631&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D102608086843&z=19.81"
				width={
					isLowerThan420 ? '300px' : isLowerThan650 ? '400px' : '100%'
				}
				height={
					isLowerThan420
						? '200px'
						: isLowerThan650
						? '350px'
						: '290px'
				}
				allowFullScreen={true}
				style={{ position: 'relative' }}
			></iframe>
		</Stack>
	);
};

export default MapsWidget;
