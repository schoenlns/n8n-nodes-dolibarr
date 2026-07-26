import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCreate = {
	resource: ['thirdParty'],
	operation: ['create'],
};

export const thirdPartyCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'Name of the third party',
		displayOptions: { show: showOnlyForCreate },
		routing: { send: { type: 'body', property: 'name' } },
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
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'address' } },
			},
			{
				displayName: 'Country Code',
				name: 'country_code',
				type: 'string',
				default: '',
				placeholder: 'e.g. FR',
				description: 'ISO country code (e.g. FR, BE, DE)',
				routing: { send: { type: 'body', property: 'country_code' } },
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				routing: { send: { type: 'body', property: 'email' } },
			},
			{
				displayName: 'Is Supplier',
				name: 'fournisseur',
				type: 'options',
				options: [
					{ name: 'No', value: 0 },
					{ name: 'Yes', value: 1 },
				],
				default: 0,
				routing: { send: { type: 'body', property: 'fournisseur' } },
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'phone' } },
			},
			{
				displayName: 'Town',
				name: 'town',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'town' } },
			},
			{
				displayName: 'Type',
				name: 'client',
				type: 'options',
				options: [
					{ name: 'None', value: 0 },
					{ name: 'Customer', value: 1 },
					{ name: 'Prospect', value: 2 },
					{ name: 'Customer & Prospect', value: 3 },
				],
				default: 1,
				description: 'Whether the third party is a customer and/or prospect',
				routing: { send: { type: 'body', property: 'client' } },
			},
			{
				displayName: 'VAT Number',
				name: 'tva_intra',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'tva_intra' } },
			},
			{
				displayName: 'Zip Code',
				name: 'zip',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'zip' } },
			},
		],
	},
];
