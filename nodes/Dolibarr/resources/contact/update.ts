import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpdate = {
	resource: ['contact'],
	operation: ['update'],
};

export const contactUpdateDescription: INodeProperties[] = [
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
				displayName: 'First Name',
				name: 'firstname',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'firstname' } },
			},
			{
				displayName: 'Job / Position',
				name: 'poste',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'poste' } },
			},
			{
				displayName: 'Last Name',
				name: 'lastname',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'lastname' } },
			},
			{
				displayName: 'Mobile Phone',
				name: 'phone_mobile',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'phone_mobile' } },
			},
			{
				displayName: 'Professional Phone',
				name: 'phone_pro',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'phone_pro' } },
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
