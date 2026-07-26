import type { INodeProperties } from 'n8n-workflow';
import { subscriptionGetManyDescription } from './getAll';
import { subscriptionGetDescription } from './get';
import { subscriptionAddDescription } from './create';
import { subscriptionUpdateDescription } from './update';

const showOnlyForSubscriptions = {
	resource: ['subscription'],
};

export const subscriptionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForSubscriptions },
		options: [
			{
				name: 'Add',
				value: 'add',
				action: 'Add a subscription to a member',
				description: 'Create a new subscription for a member',
				routing: {
					request: { method: 'POST', url: '=/members/{{$parameter.memberId}}/subscriptions' },
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a subscription',
				description: 'Delete a subscription',
				routing: {
					request: { method: 'DELETE', url: '=/subscriptions/{{$parameter.subscriptionId}}' },
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a subscription',
				description: 'Get the data of a single subscription',
				routing: {
					request: { method: 'GET', url: '=/subscriptions/{{$parameter.subscriptionId}}' },
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many subscriptions',
				description: 'Get many subscriptions',
				routing: { request: { method: 'GET', url: '/subscriptions' } },
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a subscription',
				description: 'Update an existing subscription',
				routing: {
					request: { method: 'PUT', url: '=/subscriptions/{{$parameter.subscriptionId}}' },
				},
			},
		],
		default: 'getAll',
	},
	...subscriptionGetDescription,
	...subscriptionGetManyDescription,
	...subscriptionAddDescription,
	...subscriptionUpdateDescription,
];
