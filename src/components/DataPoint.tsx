interface Props {
	heading: string;
	dataPoint: string;
}
const DataPoint = (props: Props) => {
	return (
		<div className='flex flex-col items-center justify-between gap-1 xl:px-10 xl:py-4'>
			<h2 className='text-[0.6rem] font-bold font-rubik text-dark-gray-100 tracking-widest uppercase'>
				{props.heading}
			</h2>
			<p className='text-lg font-medium text-dark-gray-900 font-rubik'>
				{props.dataPoint}
			</p>
		</div>
	);
};
export default DataPoint;
