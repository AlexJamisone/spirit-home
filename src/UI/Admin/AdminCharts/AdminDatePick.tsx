import { Icon, IconButton, Stack } from '@chakra-ui/react';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { motion } from 'framer-motion';
import { MdDone } from 'react-icons/md';
import { useChartsContext } from '~/context/chartsContext';
const AdminDatePick = () => {
	const { isDate, selectedDate, setSelectedDate, setIsDate, setSend } =
		useChartsContext();
	return (
		<Stack direction="row" justifyContent="center">
			<RangeDatepicker
				selectedDates={selectedDate}
				onDateChange={(date) => {
					if (selectedDate.length === 2) {
						setIsDate(false);
					} else {
						setIsDate(true);
					}
					setSelectedDate(date);
				}}
				configs={{
					dateFormat: 'd MMM',
					monthNames:
						'Январь Февраль Март Апрель Май Июнь Июль Август Сетябрь Октябрь Ноябрь Декабрь'.split(
							' '
						),
					dayNames: 'Вс Пн Вт Ср Чт Пт Сб'.split(' '),
				}}
				propsConfigs={{
					inputProps: {
						cursor: 'pointer',
						w: '300px',
					},
				}}
			/>
			{isDate ? (
				<IconButton
					as={motion.button}
					initial={{ opacity: 0, x: -25 }}
					animate={{
						opacity: 1,
						x: 0,
						transition: {
							type: 'spring',
							duration: 0.5,
						},
					}}
					aria-label="save-date-pick"
					colorScheme="teal"
					icon={<Icon as={MdDone} boxSize={5} />}
					onClick={() => {
						setSend(selectedDate);
						setIsDate(false);
					}}
				/>
			) : null}
		</Stack>
	);
};

export default AdminDatePick;
