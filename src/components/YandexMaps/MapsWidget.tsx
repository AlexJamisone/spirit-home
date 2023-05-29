import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MapsWidget = () => {
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
				href="https://yandex.ru/maps/org/spirit_home/240442205889/?utm_medium=mapframe&utm_source=maps"
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
				href="https://yandex.ru/maps/959/sevastopol/category/art_supplies_and_crafts/184106442/?utm_medium=mapframe&utm_source=maps"
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
				src="https://yandex.ru/map-widget/v1/?ll=33.520807%2C44.601701&mode=poi&poi%5Bpoint%5D=33.520788%2C44.601678&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D240442205889&z=15"
				width="560"
				height="400"
				allowFullScreen={true}
				style={{ position: 'relative' }}
			></iframe>
		</Stack>
	);
};

export default MapsWidget;
