import type {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeListSearchItems,
	IDataObject,
} from 'n8n-workflow';
import { dolibarrApiRequest } from '../shared/transport';

type MemberType = {
	id: number | string;
	label?: string;
};

export async function getMemberTypes(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	const qs: IDataObject = { limit: 100, sortfield: 't.libelle', sortorder: 'ASC' };

	let response: MemberType[] = [];
	try {
		response = (await dolibarrApiRequest.call(this, 'GET', '/members/types', qs)) as MemberType[];
	} catch {
		// Dolibarr renvoie une 404 lorsqu'aucun type n'existe.
		return { results: [] };
	}

	let results: INodeListSearchItems[] = (response ?? []).map((t) => ({
		name: t.label ?? `#${t.id}`,
		value: String(t.id),
	}));

	if (filter) {
		const needle = filter.toLowerCase();
		results = results.filter((r) => r.name.toLowerCase().includes(needle));
	}

	return { results };
}
