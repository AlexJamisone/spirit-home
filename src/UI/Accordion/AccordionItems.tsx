import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Icon,
	IconButton,
	Spinner,
	useToast,
} from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsBox } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import NoData from '~/components/NoData/NoData';
import { useAccordionContext } from '~/context/accardionsContext';
import { api } from '~/utils/api';

const AccordionItems = () => {
	const { data: accordions, isLoading } = api.accordions.get.useQuery();
	const { mutate: delet, isLoading: isLoadingDelet } =
		api.accordions.deleteAcc.useMutation();
	const { data: role } = api.users.getUserRole.useQuery();
	const ctx = api.useContext();
	const toast = useToast();
	const { dispatch, onToggle } = useAccordionContext();
	if (!accordions || accordions.length === 0)
		return <NoData icon={BsBox} text="Пусто" />;
	if (isLoading) return <Spinner size={['sm', 'lg']} />;
	return (
		<Accordion allowMultiple w={'600px'}>
			{accordions.map(({ id, title, content }) => (
				<AccordionItem key={id} position="relative">
					<h2>
						<AccordionButton>
							<Box
								as="span"
								flex={1}
								textAlign="left"
								fontWeight={600}
								fontSize={24}
							>
								{title}
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					{role === 'ADMIN' ? (
						<>
							<IconButton
								aria-label="edit"
								size="sm"
								top={3}
								right={'20%'}
								colorScheme="linkedin"
								position="absolute"
								icon={<Icon as={FiEdit2} />}
								onClick={() => {
									dispatch({
										type: 'SET_ALL',
										payload: {
											content,
											edit: true,
											id,
											title,
										},
									});
									onToggle();
								}}
							/>
							<IconButton
								size="sm"
								top={3}
								isLoading={isLoadingDelet}
								right={'10%'}
								aria-label="delet"
								colorScheme="red"
								position="absolute"
								icon={<Icon as={AiOutlineDelete} />}
								onClick={() => {
									delet(
										{
											id,
										},
										{
											onSuccess: () => {
												void ctx.accordions.invalidate();
												toast({
													description:
														'Успешно удалено!',
													status: 'warning',
													isClosable: true,
												});
											},
										}
									);
								}}
							/>
						</>
					) : null}
					<AccordionPanel>{content}</AccordionPanel>
				</AccordionItem>
			))}
		</Accordion>
	);
};

export default AccordionItems;
