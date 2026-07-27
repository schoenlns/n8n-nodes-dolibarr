import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { dolibarrApiRequest } from '../shared/transport';

type SuiviResultat = {
	id: number | string;
	code?: string;
	label?: string;
};

/**
 * Liste les résultats de suivi CRM exposés par le module relationadherent
 * (endpoint GET /relationadherent/resultats).
 *
 * Chargeur `loadOptions` (et non `listSearch`) : le champ vit dans une
 * collection de champs facultatifs, où un simple `options` est plus adapté
 * qu'un resourceLocator.
 */
export async function getSuiviResultats(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	let response: SuiviResultat[] = [];
	try {
		response = (await dolibarrApiRequest.call(
			this,
			'GET',
			'/relationadherent/resultats',
		)) as SuiviResultat[];
	} catch {
		// Module non installé / aucun résultat : liste vide plutôt qu'une erreur.
		return [];
	}

	return (response ?? []).map((r) => ({
		name: r.label ?? r.code ?? `#${r.id}`,
		value: Number(r.id),
	}));
}
