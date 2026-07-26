import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCreate = {
	resource: ['product'],
	operation: ['create'],
};

export const productCreateDescription: INodeProperties[] = [
	{
		displayName: 'Reference',
		name: 'ref',
		type: 'string',
		default: '',
		required: true,
		description: 'Unique reference of the product/service',
		displayOptions: { show: showOnlyForCreate },
		routing: { send: { type: 'body', property: 'ref' } },
	},
	{
		displayName: 'Label',
		name: 'label',
		type: 'string',
		default: '',
		required: true,
		description: 'Label of the product/service',
		displayOptions: { show: showOnlyForCreate },
		routing: { send: { type: 'body', property: 'label' } },
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
				displayName: 'On Buy',
				name: 'status_buy',
				type: 'options',
				options: [
					{ name: 'Yes', value: 1 },
					{ name: 'No', value: 0 },
				],
				default: 0,
				description: 'Whether the product can be purchased',
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
				description: 'Whether the product is on sale',
				routing: { send: { type: 'body', property: 'status' } },
			},
			{
				displayName: 'Selling Price (Excl. Tax)',
				name: 'price',
				type: 'number',
				default: 0,
				description: 'Selling price excluding tax',
				routing: { send: { type: 'body', property: 'price' } },
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Product', value: 0 },
					{ name: 'Service', value: 1 },
				],
				default: 0,
				routing: { send: { type: 'body', property: 'type' } },
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
