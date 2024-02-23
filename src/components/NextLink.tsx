import { Link, LinkProps } from '@chakra-ui/next-js';
import { ReactNode } from 'react';

type NextLinkProps = LinkProps & {
	children: ReactNode;
	href: string;
	newTab?: boolean;
};
const NextLink = (props: NextLinkProps) => {
	return (
		<Link
			{...props}
			href={props.href}
			fontWeight={600}
			_hover={{ textDecoration: 'none', textColor: 'brand' }}
			transition="color .3s ease-in-out"
			target={props.newTab ? '_blank' : undefined}
		>
			{props.children}
		</Link>
	);
};
export default NextLink;
