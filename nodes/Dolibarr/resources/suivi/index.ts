import type { INodeProperties } from 'n8n-workflow';
import { suiviGetDescription } from './get';
import { suiviGetManyDescription } from './getAll';
import { suiviCreateDescription } from './create';
import { suiviUpdateDescription } from './update';

const showOnlyForSuivi = {
	resource: ['suivi'],
};

export const suiviDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForSuivi },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a follow up',
				description: 'Record a new CRM follow-up for a member',
				routing: { request: { method: 'POST', url: '/relationadherent/suivi' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a follow up',
				description: 'Delete a CRM follow-up',
				routing: {
					request: { method: 'DELETE', url: '=/relationadherent/suivi/{{$parameter.suiviId}}' },
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a follow up',
				description: 'Get a single CRM follow-up',
				routing: {
					request: { method: 'GET', url: '=/relationadherent/suivi/{{$parameter.suiviId}}' },
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many follow ups',
				description: 'List CRM follow-ups',
				routing: { request: { method: 'GET', url: '/relationadherent/suivis' } },
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a follow up',
				description: 'Update an existing CRM follow-up',
				routing: {
					request: { method: 'PUT', url: '=/relationadherent/suivi/{{$parameter.suiviId}}' },
				},
			},
		],
		default: 'create',
	},
	...suiviGetDescription,
	...suiviGetManyDescription,
	...suiviCreateDescription,
	...suiviUpdateDescription,
];
