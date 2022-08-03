import Head from 'next/head';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Head>
				<title>IP Address Tracker</title>
				<meta
					name='description'
					content='Find the geolocation of an IP address'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>{children}</main>
		</>
	);
};

export default Layout;
