import type { INodeProperties } from 'n8n-workflow';
import { memberGetManyDescription } from './getAll';
import { memberGetDescription } from './get';
import { memberCreateDescription } from './create';
import { memberUpdateDescription } from './update';

const showOnlyForMembers = {
	resource: ['member'],
};

export const memberDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForMembers },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a member',
				description: 'Create a new member',
				routing: { request: { method: 'POST', url: '/members' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a member',
				description: 'Delete a member',
				routing: { request: { method: 'DELETE', url: '=/members/{{$parameter.memberId}}' } },
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a member',
				description: 'Get the data of a single member',
				routing: { request: { method: 'GET', url: '=/members/{{$parameter.memberId}}' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many members',
				description: 'Get many members',
				routing: { request: { method: 'GET', url: '/members' } },
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a member',
				description: 'Update an existing member',
				routing: { request: { method: 'PUT', url: '=/members/{{$parameter.memberId}}' } },
			},
		],
		default: 'getAll',
	},
	...memberGetDescription,
	...memberGetManyDescription,
	...memberCreateDescription,
	...memberUpdateDescription,
];
