import type {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeListSearchItems,
	IDataObject,
} from 'n8n-workflow';
import { dolibarrApiRequest } from '../shared/transport';
import { escapeSqlFilterValue } from '../shared/utils';

type Product = {
	id: number | string;
	ref?: string;
	label?: string;
};

export async function getProducts(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? +paginationToken : 0;
	const limit = 100;

	const qs: IDataObject = {
		limit,
		page,
		sortfield: 't.ref',
		sortorder: 'ASC',
	};

	if (filter) {
		const escaped = escapeSqlFilterValue(filter);
		qs.sqlfilters = `(t.ref:like:'%${escaped}%') OR (t.label:like:'%${escaped}%')`;
	}

	let response: Product[] = [];
	try {
		response = (await dolibarrApiRequest.call(this, 'GET', '/products', qs)) as Product[];
	} catch {
		return { results: [] };
	}

	const results: INodeListSearchItems[] = (response ?? []).map((p) => ({
		name: [p.ref, p.label].filter(Boolean).join(' — ') || `#${p.id}`,
		value: String(p.id),
	}));

	const nextPaginationToken = response.length === limit ? String(page + 1) : undefined;
	return { results, paginationToken: nextPaginationToken };
}
