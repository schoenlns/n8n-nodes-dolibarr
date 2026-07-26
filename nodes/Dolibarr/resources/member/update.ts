import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpdate = {
	resource: ['member'],
	operation: ['update'],
};

export const memberUpdateDescription: INodeProperties[] = [
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
				displayName: 'Company',
				name: 'societe',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'societe' } },
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
				displayName: 'First Name',
				name: 'firstname',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'firstname' } },
			},
			{
				displayName: 'Last Name / Company',
				name: 'lastname',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'lastname' } },
			},
			{
				displayName: 'Login',
				name: 'login',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'login' } },
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'phone' } },
			},
			{
				displayName: 'Status',
				name: 'statut',
				type: 'options',
				options: [
					{ name: 'Draft', value: -1 },
					{ name: 'Validated', value: 1 },
					{ name: 'Resiliated', value: 0 },
					{ name: 'Excluded', value: -2 },
				],
				default: 1,
				routing: { send: { type: 'body', property: 'statut' } },
			},
			{
				displayName: 'Town',
				name: 'town',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'town' } },
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
