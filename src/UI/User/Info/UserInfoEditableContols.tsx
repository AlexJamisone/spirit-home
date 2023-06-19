import { Icon, IconButton, useEditableControls } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsCheck2 } from 'react-icons/bs';

type UserInfoEditableContolsProps = {
	isLoading: boolean;
};

const UserInfoEditableContols = ({
	isLoading,
}: UserInfoEditableContolsProps) => {
	const { isEditing, getSubmitButtonProps } = useEditableControls();
	return (
		<>
			{isEditing ? (
				<IconButton
					isLoading={isLoading}
					size="sm"
					aria-label="submit_name"
					as={motion.button}
					initial={{ opacity: 0, y: 25 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: { duration: 0.3 },
					}}
					icon={<Icon as={BsCheck2} />}
					{...getSubmitButtonProps()}
				/>
			) : null}
		</>
	);
};

export default UserInfoEditableContols;
