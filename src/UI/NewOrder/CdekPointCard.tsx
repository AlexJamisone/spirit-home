import { Button, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNewOrder } from '~/stores/useNewOrder';

const CdekPointCard = () => {
	const {
		address: { selectedPoint },
		controls,
		setControls,
	} = useNewOrder();
	return (
		<Stack
			maxW={400}
			boxShadow="base"
			p={5}
			rounded="2xl"
			as={motion.div}
			layout
			fontSize={14}
			initial={{ opacity: 0, y: -50 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					duration: 0.3,
				},
			}}
			border={controls.selectedPVZ ? '1px solid' : undefined}
			borderColor={controls.selectedPVZ ? 'blue.400' : undefined}
		>
			<Text>ПВЗ: {selectedPoint?.name}</Text>
			<Text>Адрес: {selectedPoint?.addressName}</Text>
			<Text>Режим работы: {selectedPoint?.work_time}</Text>
			<Text>Телефон: {selectedPoint?.phone}</Text>
			{selectedPoint?.email && <Text>Email: {selectedPoint.email}</Text>}
			<Button
				size="sm"
				border={controls.errorSelectedPVZ ? '1px solid' : undefined}
				borderColor={
					controls.errorSelectedPVZ ? 'orange.300' : undefined
				}
				onClick={() => {
					if (controls.errorSelectedPVZ) {
						setControls({ errorSelectedPVZ: false });
					}
					setControls({
						showMap: !controls.showMap,
						selectedPVZ: !controls.selectedPVZ,
					});
				}}
			>
				{controls.showMap ? 'Выбрать' : 'Изменить'}
			</Button>
		</Stack>
	);
};

export default CdekPointCard;
