import type { INodeProperties } from 'n8n-workflow';
import { thirdPartySelect } from '../../shared/descriptions';

const showOnlyForCreate = {
	resource: ['contact'],
	operation: ['create'],
};

export const contactCreateDescription: INodeProperties[] = [
	{
		displayName: 'Last Name',
		name: 'lastname',
		type: 'string',
		default: '',
		required: true,
		description: 'Last name of the contact',
		displayOptions: { show: showOnlyForCreate },
		routing: { send: { type: 'body', property: 'lastname' } },
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
				...thirdPartySelect,
				name: 'socid',
				displayName: 'Linked Third Party',
				required: false,
				description: 'Third party this contact belongs to',
				routing: { send: { type: 'body', property: 'socid' } },
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
