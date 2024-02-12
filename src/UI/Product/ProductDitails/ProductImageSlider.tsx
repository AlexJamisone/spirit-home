import { Icon, IconButton, Image, Stack } from '@chakra-ui/react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { type IconType } from 'react-icons';
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import ImageFallback from '~/components/NoData/ImageFallback';
import { env } from '~/env.mjs';
import { useProduct } from '~/hooks/useProduct';
const ProductImageSlider = () => {
	const { product } = useProduct();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel({
		startIndex: 0,
	});
	const [emblaThumbRef, emblaThumbApi] = useEmblaCarousel({
		dragFree: true,
		containScroll: 'keepSnaps',
	});
	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaApi || !emblaThumbApi) return;
			emblaApi.scrollTo(index);
		},
		[emblaApi, emblaThumbApi]
	);
	const btnControl = ({
		position,
		action,
		icon,
	}: {
		position: 'right' | 'left';
		action: () => void;
		icon: IconType;
	}) => {
		return (
			<>
				{((position === 'right' && emblaApi?.canScrollNext()) ||
					(position === 'left' && emblaApi?.canScrollPrev())) && (
					<IconButton
						position="absolute"
						variant="solid"
						size="sm"
						aria-label="prev"
						icon={<Icon as={icon} boxSize={7} />}
						top="45%"
						left={position === 'left' ? 5 : undefined}
						right={position === 'right' ? 5 : undefined}
						rounded="full"
						onClick={() => action()}
					/>
				)}
			</>
		);
	};
	const onSelect = useCallback(() => {
		if (!emblaApi || !emblaThumbApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		emblaThumbApi.scrollTo(emblaApi.selectedScrollSnap());
	}, [emblaApi, emblaThumbApi]);
	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);
	}, [emblaApi, onSelect]);

	return (
		<Stack>
			<Stack ref={emblaRef} overflow="hidden" position="relative">
				<Stack direction="row">
					{product?.image.map((src, index) => (
						<Image
							fallback={<ImageFallback isSlider />}
							key={index}
							alt={`${src}`}
							src={env.NEXT_PUBLIC_UPLOADTHING_URL + src}
							flex="0 0 100%"
							w={['100%', 300]}
                            objectFit='contain'
                            maxH={500}
						/>
					))}
				</Stack>
				{btnControl({
					position: 'left',
					action: () => emblaApi?.scrollPrev(),
					icon: MdOutlineKeyboardArrowLeft,
				})}
				{btnControl({
					position: 'right',
					action: () => emblaApi?.scrollNext(),
					icon: MdOutlineKeyboardArrowRight,
				})}
			</Stack>
			<Stack
				ref={emblaThumbRef}
				direction="row"
				justifyContent="center"
				overflow="hidden"
			>
				{product?.image.map((src, index) => (
					<Image
						fallback={<ImageFallback width="100px" height="90px" />}
						alt={`${src}`}
						src={env.NEXT_PUBLIC_UPLOADTHING_URL + src}
						key={src}
						w={100}
						h={90}
                        objectFit='cover'
						cursor="pointer"
						onClick={() => onThumbClick(index)}
						opacity={index === selectedIndex ? 1 : 0.2}
						transition="opacity .2s ease-in-out"
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default ProductImageSlider;
