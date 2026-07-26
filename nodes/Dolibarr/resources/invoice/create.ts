import type { INodeProperties } from 'n8n-workflow';
import { thirdPartySelect } from '../../shared/descriptions';

const showOnlyForCreate = {
	resource: ['invoice'],
	operation: ['create'],
};

export const invoiceCreateDescription: INodeProperties[] = [
	{
		...thirdPartySelect,
		name: 'socid',
		displayName: 'Third Party (Customer)',
		description: 'Customer the invoice is issued to',
		routing: { send: { type: 'body', property: 'socid' } },
		displayOptions: { show: showOnlyForCreate },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForCreate },
		options: [
			{
				displayName: 'Due Date',
				name: 'date_lim_reglement',
				type: 'dateTime',
				default: '',
				routing: { send: { type: 'body', property: 'date_lim_reglement' } },
			},
			{
				displayName: 'Invoice Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Invoice date (defaults to today if omitted)',
				routing: { send: { type: 'body', property: 'date' } },
			},
			{
				displayName: 'Private Note',
				name: 'note_private',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				routing: { send: { type: 'body', property: 'note_private' } },
			},
			{
				displayName: 'Public Note',
				name: 'note_public',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				routing: { send: { type: 'body', property: 'note_public' } },
			},
			{
				displayName: 'Reference (Customer)',
				name: 'ref_client',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'ref_client' } },
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Standard', value: 0 },
					{ name: 'Replacement', value: 1 },
					{ name: 'Credit Note', value: 2 },
					{ name: 'Deposit', value: 3 },
				],
				default: 0,
				routing: { send: { type: 'body', property: 'type' } },
			},
		],
	},
	{
		displayName:
			'A draft invoice is created without lines. Add lines afterwards via the Dolibarr API lines endpoint, then use the Validate operation.',
		name: 'invoiceCreateNotice',
		type: 'notice',
		default: '',
		displayOptions: { show: showOnlyForCreate },
	},
];
