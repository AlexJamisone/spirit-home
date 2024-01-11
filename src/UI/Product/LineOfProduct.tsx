import { Center, Spinner, Stack } from '@chakra-ui/react';
import { useDebounce } from '@uidotdev/usehooks';
import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';
import { MdCabin } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoData from '~/components/NoData/NoData';
import Placeholdes from '~/components/Placeholdes';
import { useSearch } from '~/stores/useSearch';
import { api } from '~/utils/api';
import ProductsCard from './ProductCard';

const LineOfProduct = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		inViewThreshold: 0,
		dragFree: true,
		containScroll: 'trimSnaps',
		slides: document.querySelectorAll('.slider'),
		container: document.querySelector('.container') as HTMLElement,
	});

	const search = useSearch();
	const { data, fetchNextPage, hasNextPage } =
		api.products.getForAll.useInfiniteQuery(
			{
				limit: 3,
				search: useDebounce(search.query, 1000),
			},
			{
				getNextPageParam: (lastPage) => {
					if (emblaApi) {
						emblaApi.reInit({
							inViewThreshold: 0,
							dragFree: true,
							containScroll: 'trimSnaps',
							slides: document.querySelectorAll('.slider'),
							container: document.querySelector(
								'.container'
							) as HTMLElement,
						});
					}
					return lastPage.nextCursor;
				},
			}
		);
	if (!data) return <Placeholdes quantity={3} />;
	if (data.pages[0]?.items.length === 0)
		return (
			<Stack minH={350} justifyContent={'center'}>
				<NoData icon={MdCabin} text="Нет продуктов" />
			</Stack>
		);
	const dataLength = data.pages.reduce(
		(totalLength, page) => totalLength + page.items.length,
		0
	);
	return (
		<Stack
			mb={10}
			sx={{
				maskImage:
					'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent 100%)',
			}}
			overflow="hidden"
			className="wheel"
			ref={emblaRef}
			px={'200px'}
			alignItems={dataLength < 5 ? 'center' : undefined}
		>
			<Stack direction="row" className="container">
				<InfiniteScroll
					dataLength={dataLength}
					hasMore={hasNextPage ?? true}
					loader={
						<Center overflow="hidden">
							<Spinner />
						</Center>
					}
					next={fetchNextPage}
					style={{
						display: 'flex',
						gap: '40px',
					}}
				>
					{data.pages.map((page, index) => (
						<React.Fragment key={index}>
							{page.items?.map((product) => (
								<Stack key={product.id} className="slider">
									<ProductsCard
										key={product.id}
										product={product}
										role="USER"
									/>
								</Stack>
							))}
						</React.Fragment>
					))}
				</InfiniteScroll>
			</Stack>
		</Stack>
	);
};

export default LineOfProduct;
