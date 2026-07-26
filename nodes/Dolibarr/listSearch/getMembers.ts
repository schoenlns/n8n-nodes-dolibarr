import type {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeListSearchItems,
	IDataObject,
} from 'n8n-workflow';
import { dolibarrApiRequest } from '../shared/transport';
import { escapeSqlFilterValue } from '../shared/utils';

type Member = {
	id: number | string;
	lastname?: string;
	firstname?: string;
	societe?: string;
	login?: string;
};

export async function getMembers(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? +paginationToken : 0;
	const limit = 100;

	const qs: IDataObject = {
		limit,
		page,
		sortfield: 't.lastname',
		sortorder: 'ASC',
	};

	if (filter) {
		const escaped = escapeSqlFilterValue(filter);
		qs.sqlfilters = `(t.lastname:like:'%${escaped}%') OR (t.firstname:like:'%${escaped}%') OR (t.societe:like:'%${escaped}%')`;
	}

	let response: Member[] = [];
	try {
		response = (await dolibarrApiRequest.call(this, 'GET', '/members', qs)) as Member[];
	} catch {
		return { results: [] };
	}

	const results: INodeListSearchItems[] = (response ?? []).map((m) => {
		const name =
			[m.firstname, m.lastname].filter(Boolean).join(' ') || m.societe || m.login || `#${m.id}`;
		return { name, value: String(m.id) };
	});

	const nextPaginationToken = response.length === limit ? String(page + 1) : undefined;
	return { results, paginationToken: nextPaginationToken };
}
