import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpdate = {
	resource: ['invoiceLine'],
	operation: ['update'],
};

export const invoiceLineUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForUpdate },
		options: [
			{
				displayName: 'Description',
				name: 'desc',
				type: 'string',
				typeOptions: { rows: 2 },
				default: '',
				routing: { send: { type: 'body', property: 'desc' } },
			},
			{
				displayName: 'Discount (%)',
				name: 'remise_percent',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'remise_percent' } },
			},
			{
				displayName: 'Quantity',
				name: 'qty',
				type: 'number',
				default: 1,
				routing: { send: { type: 'body', property: 'qty' } },
			},
			{
				displayName: 'Unit Price (Excl. Tax)',
				name: 'subprice',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'subprice' } },
			},
			{
				displayName: 'VAT Rate (%)',
				name: 'tva_tx',
				type: 'number',
				default: 20,
				routing: { send: { type: 'body', property: 'tva_tx' } },
			},
		],
	},
];
