import { Icon, IconButton, Stack } from '@chakra-ui/react';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { MdDone } from 'react-icons/md';
import { useChartsContext } from '~/context/chartsContext';

const AdminDatePick = () => {
	const { isDate, selectedDate, send, setSelectedDate, setIsDate, setSend } =
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
					dateFormat: 'dd/MM/yyyy',
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
