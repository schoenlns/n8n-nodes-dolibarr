import type { INodeProperties } from 'n8n-workflow';
import { productSelect } from '../../shared/descriptions';

const showOnlyForAdd = {
	resource: ['invoiceLine'],
	operation: ['add'],
};

export const invoiceLineAddDescription: INodeProperties[] = [
	{
		displayName: 'Quantity',
		name: 'qty',
		type: 'number',
		default: 1,
		required: true,
		description: 'Quantity for this line',
		displayOptions: { show: showOnlyForAdd },
		routing: { send: { type: 'body', property: 'qty' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForAdd },
		options: [
			{
				displayName: 'Description',
				name: 'desc',
				type: 'string',
				typeOptions: { rows: 2 },
				default: '',
				description: 'Label/description of the line',
				routing: { send: { type: 'body', property: 'desc' } },
			},
			{
				displayName: 'Discount (%)',
				name: 'remise_percent',
				type: 'number',
				default: 0,
				description: 'Line discount in percent',
				routing: { send: { type: 'body', property: 'remise_percent' } },
			},
			{
				...productSelect,
				name: 'fk_product',
				displayName: 'Product',
				required: false,
				description: 'Link an existing product/service to this line',
				routing: { send: { type: 'body', property: 'fk_product' } },
			},
			{
				displayName: 'Type',
				name: 'product_type',
				type: 'options',
				options: [
					{ name: 'Product', value: 0 },
					{ name: 'Service', value: 1 },
				],
				default: 0,
				routing: { send: { type: 'body', property: 'product_type' } },
			},
			{
				displayName: 'Unit Price (Excl. Tax)',
				name: 'subprice',
				type: 'number',
				default: 0,
				description: 'Unit price excluding tax',
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
