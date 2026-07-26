import type { INodeProperties } from 'n8n-workflow';
import { memberTypeSelect } from '../../shared/descriptions';

const showOnlyForCreate = {
	resource: ['member'],
	operation: ['create'],
};

export const memberCreateDescription: INodeProperties[] = [
	{
		displayName: 'Nature',
		name: 'morphy',
		type: 'options',
		options: [
			{ name: 'Person (Physical)', value: 'phy' },
			{ name: 'Organization (Moral)', value: 'mor' },
		],
		default: 'phy',
		required: true,
		description: 'Whether the member is an individual or an organization',
		displayOptions: { show: showOnlyForCreate },
		routing: { send: { type: 'body', property: 'morphy' } },
	},
	{
		...memberTypeSelect,
		displayOptions: { show: showOnlyForCreate },
		routing: { send: { type: 'body', property: 'typeid' } },
	},
	{
		displayName: 'Last Name / Company',
		name: 'lastname',
		type: 'string',
		default: '',
		required: true,
		description: 'Last name (for a person) or main name of the member',
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
				displayName: 'Company',
				name: 'societe',
				type: 'string',
				default: '',
				description: 'Company name (mainly for organization members)',
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
				default: -1,
				description: 'Member status',
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
