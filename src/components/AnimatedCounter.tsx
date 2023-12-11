import {
	animate,
	motion,
	useInView,
	useMotionValue,
	useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

type AnimatedCounterProps = {
	from: number;
	to: number;
};

const AnimatedCounter = ({ from, to }: AnimatedCounterProps) => {
	const count = useMotionValue(from);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const ref = useRef(null);
	const inView = useInView(ref);

	useEffect(() => {
		if (inView) {
			void animate(count, to, {
				duration: Math.floor(Math.random() * 3) + 1,
				delay: 0.2,
			});
		}
	}, [count, inView, to]);
	return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default AnimatedCounter;
