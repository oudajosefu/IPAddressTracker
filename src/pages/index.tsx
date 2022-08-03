import Image from 'next/image';
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import { FormEvent, useState } from 'react';
import DataPoint from '../components/DataPoint';
import Map from '../components/Map';

const Home: NextPage = ({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	// console.log(data);

	const [geoData, setGeoData] = useState(data);
	const [inputQuery, setInputQuery] = useState('');
	const [isBadInput, setBadInput] = useState(false);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		fetch(`/api/getData?ipOrDom=${inputQuery}`)
			.then((res) => res.json())
			.then((newData) => {
				if (!newData.ip) {
					console.error({ response: 'error', ...newData });
					setBadInput(true);
					setInputQuery('');
				} else {
					console.log({ response: 'success', ...newData });
					setBadInput(false);
					setInputQuery('');
					setGeoData(newData);
				}
			})
			.catch((err) => console.log('outside error: ' + err));
	};

	return (
		<div className='relative flex flex-col w-screen h-screen'>
			<header className='relative h-[38%] xl:h-1/3 2xl:h-[27%]'>
				<Image
					src='/static/images/pattern-bg.png'
					alt='pattern-bg'
					layout='fill'
					objectFit='cover'
					priority={true}
				/>
			</header>
			<div className='flex-grow'>
				<Map center={[geoData.location.lat, geoData.location.lng]} />
			</div>
			<div className='absolute flex flex-col items-center w-screen h-screen gap-7 p-7'>
				<h1 className='text-2xl font-medium text-white font-rubik'>
					IP Address Tracker
				</h1>
				<label className='relative w-full max-w-xl overflow-hidden bg-white h-[7%] rounded-xl'>
					<form
						className='flex items-center justify-between h-full'
						onSubmit={handleSubmit}>
						{isBadInput && (
							<h2 className='absolute top-0 text-sm font-bold text-red-600 left-7'>
								Input correct domain
							</h2>
						)}
						<span className='flex-grow px-7'>
							<input
								className='w-full outline-none'
								type='text'
								placeholder='Search for any IP address or domain'
								onChange={(event) =>
									setInputQuery(event.target.value)
								}
								value={inputQuery}
							/>
						</span>
						<button
							className='flex items-center justify-center h-full bg-black aspect-square hover:bg-opacity-80'
							type='submit'>
							<Image
								src='/static/images/icon-arrow.svg'
								alt='icon-arrow'
								height={15}
								width={15}
								objectFit='contain'
							/>
						</button>
					</form>
				</label>
				<section className='bg-white h-[38%] w-full rounded-xl flex flex-col items-center justify-evenly xl:justify-center max-w-2xl xl:max-w-5xl z-10 overflow-hidden xl:flex-row xl:max-h-40 xl:divide-dark-gray-100 xl:divide-x-[1px] xl:divide-opacity-70 min-h-fit'>
					<DataPoint heading='Ip Address' dataPoint={geoData.ip} />
					<DataPoint
						heading='Location'
						dataPoint={`${geoData.location.city}, ${geoData.location.region} ${geoData.location.postalCode}`}
					/>
					<DataPoint
						heading='Timezone'
						dataPoint={`UTC ${geoData.location.timezone}`}
					/>
					<DataPoint heading='Isp' dataPoint={geoData.isp} />
				</section>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(
		`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}`
	);
	const data = await res.json();

	return {
		props: { data },
	};
};

export default Home;
