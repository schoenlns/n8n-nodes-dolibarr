import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpdate = {
	resource: ['product'],
	operation: ['update'],
};

export const productUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForUpdate },
		options: [
			{
				displayName: 'Barcode',
				name: 'barcode',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'barcode' } },
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				routing: { send: { type: 'body', property: 'description' } },
			},
			{
				displayName: 'Label',
				name: 'label',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'label' } },
			},
			{
				displayName: 'On Buy',
				name: 'status_buy',
				type: 'options',
				options: [
					{ name: 'Yes', value: 1 },
					{ name: 'No', value: 0 },
				],
				default: 0,
				routing: { send: { type: 'body', property: 'status_buy' } },
			},
			{
				displayName: 'On Sale',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Yes', value: 1 },
					{ name: 'No', value: 0 },
				],
				default: 1,
				routing: { send: { type: 'body', property: 'status' } },
			},
			{
				displayName: 'Reference',
				name: 'ref',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'ref' } },
			},
			{
				displayName: 'Selling Price (Excl. Tax)',
				name: 'price',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'price' } },
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
