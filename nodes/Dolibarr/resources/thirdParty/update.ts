import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpdate = {
	resource: ['thirdParty'],
	operation: ['update'],
};

export const thirdPartyUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForUpdate },
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
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'name' } },
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
