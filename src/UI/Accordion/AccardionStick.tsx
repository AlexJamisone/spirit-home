import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Icon,
	IconButton,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import type { Accordion } from '@prisma/client';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { useAccordionContext } from '~/context/accardionsContext';
import { api } from '~/utils/api';

type AccardionStickProps = {
	accordion: Accordion;
};

const AccardionStick = ({ accordion }: AccardionStickProps) => {
	const { mutate: delet, isLoading: isLoadingDelet } =
		api.accordions.deleteAcc.useMutation();
	const { data: role } = api.users.getUserRole.useQuery();
	const ctx = api.useContext();
	const toast = useToast();
	const { dispatch, onToggle } = useAccordionContext();

	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Stack
						as="span"
						textAlign="left"
						fontWeight={600}
						fontSize={['md', '2xl']}
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						gap={3}
						w="100%"
						defaultValue={accordion.title}
					>
						<Text>{accordion.title}</Text>
						{role === 'ADMIN' && (
							<Stack direction="row" mr={10}>
								<IconButton
									aria-label="edit"
									size="sm"
									colorScheme="linkedin"
									icon={<Icon as={FiEdit2} />}
									onClick={(e) => {
										e.stopPropagation();
										dispatch({
											type: 'SET_ALL',
											payload: {
												content:
													accordion.content.join(
														'\n\n'
													),
												edit: true,
												id: accordion.id,
												title: accordion.title,
											},
										});
										onToggle();
									}}
								/>
								<IconButton
									size="sm"
									isLoading={isLoadingDelet}
									aria-label="delet"
									colorScheme="red"
									icon={<Icon as={AiOutlineDelete} />}
									onClick={(e) => {
										e.stopPropagation();
										delet(
											{
												id: accordion.id,
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
							</Stack>
						)}
					</Stack>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel w="initial">
				{accordion.content.map((string, index) => (
					<Stack
						key={index}
						mb={index !== accordion.content.length - 1 ? 5 : 0}
					>
						<Text fontSize={['small', 'medium']}>{string}</Text>
					</Stack>
				))}
			</AccordionPanel>
		</AccordionItem>
	);
};

export default AccardionStick;
