import type {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeListSearchItems,
} from 'n8n-workflow';
import { dolibarrApiRequest } from '../shared/transport';

type SuiviType = {
	id: number | string;
	code?: string;
	label?: string;
};

/**
 * Liste les types de suivi CRM exposés par le module relationadherent
 * (endpoint GET /relationadherent/types).
 */
export async function getSuiviTypes(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	let response: SuiviType[] = [];
	try {
		response = (await dolibarrApiRequest.call(
			this,
			'GET',
			'/relationadherent/types',
		)) as SuiviType[];
	} catch {
		// Module non installé / aucun type : liste vide plutôt qu'une erreur.
		return { results: [] };
	}

	let results: INodeListSearchItems[] = (response ?? []).map((t) => ({
		name: t.label ?? t.code ?? `#${t.id}`,
		value: String(t.id),
	}));

	if (filter) {
		const needle = filter.toLowerCase();
		results = results.filter((r) => r.name.toLowerCase().includes(needle));
	}

	return { results };
}
