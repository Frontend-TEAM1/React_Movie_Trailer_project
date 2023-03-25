
import { useInfiniteNowPlay } from 'hooks/queries/get-infinite-movieList';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { flexAlignCenter } from 'Styles/common';

const NowPlayList = () => {
	const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w1280/';
	const res = useInfiniteNowPlay();
	const { data } = res;
	const resData = data?.pages[0].data.results;

	const [ref, inView] = useInView();

	useEffect(() => {
		if (!inView) {
			return;
		}
		res.fetchNextPage();
	}, [inView]);

	return (
		<>
			{data?.pages.map(page => {
				return (
					<S.Box>
						{page?.data.results.map(data => (
							<S.Wrapper>
								{data.poster_path ? (
									<img src={IMG_BASE_URL + data.poster_path} alt="영화포스터" />
								) : (
									<img src="Assets/mascot.png" alt="이미지없음" />
								)}
								<S.Info>
									<h4>{data.title}</h4>
									<span>{data.vote_average}</span>
								</S.Info>
							</S.Wrapper>
						))}
					</S.Box>
				);
			})}
			<div ref={ref}></div>
		</>
	);
};

export default NowPlayList;
const Wrapper = styled.div`
	width: 150px;
	border: 1px solid black;
	margin: 16px;
	background-color: #373b69;
	color: white;
	border-radius: 20px;
	box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.5);
	& > img {
		max-width: 100%;
	}
`;

const Box = styled.div`
	${flexAlignCenter}
	flex-wrap: wrap;
`;

const Info = styled.div`
	${flexAlignCenter}
	padding: 20px;
	justify-content: space-between;

	& > span {
		margin-left: 10px;
		font-size: 14px;
	}
`;

const S = {
	Wrapper,
	Info,
	Box,
};