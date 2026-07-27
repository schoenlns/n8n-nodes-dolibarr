import type { INodeProperties } from 'n8n-workflow';

/**
 * Sélecteur de Tiers (Third Party) sous forme de resourceLocator :
 * soit par liste déroulante recherchable (méthode `getThirdParties`),
 * soit par saisie directe de l'ID (rowid Dolibarr).
 */
export const thirdPartySelect: INodeProperties = {
	displayName: 'Third Party',
	name: 'thirdPartyId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	description: 'Le tiers (client / prospect / fournisseur)',
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			placeholder: 'Select a third party...',
			typeOptions: {
				searchListMethod: 'getThirdParties',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. 42',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'The ID must be numeric',
					},
				},
			],
		},
	],
};

/**
 * Sélecteur de Produit/Service sous forme de resourceLocator.
 */
export const productSelect: INodeProperties = {
	displayName: 'Product',
	name: 'productId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	description: 'Le produit ou service',
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			placeholder: 'Select a product...',
			typeOptions: {
				searchListMethod: 'getProducts',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. 10',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'The ID must be numeric',
					},
				},
			],
		},
	],
};

/**
 * Sélecteur d'Adhérent (Member) sous forme de resourceLocator.
 */
export const memberSelect: INodeProperties = {
	displayName: 'Member',
	name: 'memberId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			placeholder: 'Select a member...',
			typeOptions: {
				searchListMethod: 'getMembers',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. 42',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'The ID must be numeric',
					},
				},
			],
		},
	],
};

/**
 * Sélecteur de Type d'adhérent (Member Type) sous forme de resourceLocator.
 */
export const memberTypeSelect: INodeProperties = {
	displayName: 'Member Type',
	name: 'typeid',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	description: 'The membership type',
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			placeholder: 'Select a member type...',
			typeOptions: {
				searchListMethod: 'getMemberTypes',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. 1',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'The ID must be numeric',
					},
				},
			],
		},
	],
};

/**
 * Sélecteur de Type de suivi CRM (module relationadherent) sous forme de
 * resourceLocator : liste recherchable (méthode `getSuiviTypes`) ou saisie de l'ID.
 */
export const suiviTypeSelect: INodeProperties = {
	displayName: 'Follow-Up Type',
	name: 'suiviTypeId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	description: 'Le type d\'interaction (appel, email, RDV, …)',
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			placeholder: 'Select a type...',
			typeOptions: {
				searchListMethod: 'getSuiviTypes',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. 1',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'The ID must be numeric',
					},
				},
			],
		},
	],
};

/**
 * Champ ID générique (saisie libre) pour les ressources sans recherche dédiée.
 */
export function idField(displayName: string, name: string): INodeProperties {
	return {
		displayName,
		name,
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 42',
		description: `ID (rowid) ${displayName}`,
	};
}

/**
 * Génère les champs de pagination standard (`Return All` + `Limit`) pour une
 * opération « Get Many ».
 *
 * - `Return All = false` : une seule page de `Limit` éléments (query `limit`),
 *   les résultats sont plafonnés côté n8n via `output.maxResults`.
 * - `Return All = true` : pagination par offset Dolibarr (`page` incrémenté,
 *   `limit` fixé à 100) jusqu'à ce qu'une page renvoie moins de 100 éléments.
 */
export function paginationProperties(resource: string): INodeProperties[] {
	const show = { resource: [resource], operation: ['getAll'] };
	return [
		{
			displayName: 'Return All',
			name: 'returnAll',
			type: 'boolean',
			default: false,
			description: 'Whether to return all results or only up to a given limit',
			displayOptions: { show },
			routing: {
				send: {
					paginate: '={{ $value }}',
				},
				operations: {
					pagination: {
						type: 'generic',
						properties: {
							continue: '={{ Array.isArray($response.body) && $response.body.length === 100 }}',
							request: {
								qs: {
									limit: 100,
									page: '={{ $pageCount }}',
								},
							},
						},
					},
				},
			},
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			default: 50,
			typeOptions: { minValue: 1 },
			description: 'Max number of results to return',
			displayOptions: { show: { ...show, returnAll: [false] } },
			routing: {
				send: {
					type: 'query',
					property: 'limit',
				},
				output: {
					maxResults: '={{ $value }}',
				},
			},
		},
	];
}

/**
 * Collection de filtres/tri commune aux opérations « Get Many ».
 */
export function listFilters(resource: string): INodeProperties {
	return {
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: [resource], operation: ['getAll'] } },
		options: [
			{
				displayName: 'Sort Field',
				name: 'sortfield',
				type: 'string',
				default: '',
				placeholder: 'e.g. t.rowid',
				description: 'Field to sort on (Dolibarr SQL column, e.g. t.nom)',
				routing: { request: { qs: { sortfield: '={{$value}}' } } },
			},
			{
				displayName: 'Sort Order',
				name: 'sortorder',
				type: 'options',
				options: [
					{ name: 'ASC', value: 'ASC' },
					{ name: 'DESC', value: 'DESC' },
				],
				default: 'ASC',
				routing: { request: { qs: { sortorder: '={{$value}}' } } },
			},
			{
				displayName: 'SQL Filters',
				name: 'sqlfilters',
				type: 'string',
				default: '',
				placeholder: "e.g. (t.nom:like:'%Doe%')",
				description:
					'Dolibarr SQL filter expression, e.g. (t.datec:>=:\'2024-01-01\') AND (t.nom:like:\'%foo%\')',
				routing: { request: { qs: { sqlfilters: '={{$value}}' } } },
			},
		],
	};
}
