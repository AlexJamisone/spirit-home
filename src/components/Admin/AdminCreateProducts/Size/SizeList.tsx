import { api } from '~/utils/api';
import SizeCard from './SizeCard';

const SizeList = () => {
	const { data: size } = api.size.get.useQuery();
	if (!size) return null;
	return (
		<>
			{size.map((val) => (
				<SizeCard key={val.id} size={val} />
			))}
		</>
	);
};

export default SizeList;
