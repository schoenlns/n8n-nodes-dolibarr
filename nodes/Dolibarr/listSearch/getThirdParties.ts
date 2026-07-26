import type {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeListSearchItems,
	IDataObject,
} from 'n8n-workflow';
import { dolibarrApiRequest } from '../shared/transport';
import { escapeSqlFilterValue } from '../shared/utils';

type ThirdParty = {
	id: number | string;
	name?: string;
	nom?: string;
	code_client?: string;
};

export async function getThirdParties(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? +paginationToken : 0;
	const limit = 100;

	const qs: IDataObject = {
		limit,
		page,
		sortfield: 't.nom',
		sortorder: 'ASC',
	};

	if (filter) {
		qs.sqlfilters = `(t.nom:like:'%${escapeSqlFilterValue(filter)}%')`;
	}

	let response: ThirdParty[] = [];
	try {
		response = (await dolibarrApiRequest.call(this, 'GET', '/thirdparties', qs)) as ThirdParty[];
	} catch {
		// Dolibarr renvoie une 404 lorsqu'aucun tiers ne correspond : on retourne une liste vide.
		return { results: [] };
	}

	const results: INodeListSearchItems[] = (response ?? []).map((tp) => ({
		name: tp.name ?? tp.nom ?? `#${tp.id}`,
		value: String(tp.id),
	}));

	const nextPaginationToken = response.length === limit ? String(page + 1) : undefined;
	return { results, paginationToken: nextPaginationToken };
}
