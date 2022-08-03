// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	query: {
		ipOrDom: string;
	};
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const link = /[a-zA-z]/.test(req.query.ipOrDom as string)
		? `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&domain=${req.query.ipOrDom}`
		: `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&ipAddress=${req.query.ipOrDom}`;
	fetch(link)
		.then((result) => result.json())
		.then((data) => {
			console.log(data);
			res.status(200).json(data);
		})
		.catch((e) => res.status(400).json(e));
}
