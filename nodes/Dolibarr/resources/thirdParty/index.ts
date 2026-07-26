import type { INodeProperties } from 'n8n-workflow';
import { thirdPartyGetManyDescription } from './getAll';
import { thirdPartyGetDescription } from './get';
import { thirdPartyCreateDescription } from './create';
import { thirdPartyUpdateDescription } from './update';

const showOnlyForThirdParties = {
	resource: ['thirdParty'],
};

export const thirdPartyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForThirdParties },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a third party',
				description: 'Create a new third party',
				routing: { request: { method: 'POST', url: '/thirdparties' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a third party',
				description: 'Delete a third party',
				routing: {
					request: { method: 'DELETE', url: '=/thirdparties/{{$parameter.thirdPartyId}}' },
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a third party',
				description: 'Get the data of a single third party',
				routing: {
					request: { method: 'GET', url: '=/thirdparties/{{$parameter.thirdPartyId}}' },
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many third parties',
				description: 'Get many third parties',
				routing: { request: { method: 'GET', url: '/thirdparties' } },
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a third party',
				description: 'Update an existing third party',
				routing: {
					request: { method: 'PUT', url: '=/thirdparties/{{$parameter.thirdPartyId}}' },
				},
			},
		],
		default: 'getAll',
	},
	...thirdPartyGetDescription,
	...thirdPartyGetManyDescription,
	...thirdPartyCreateDescription,
	...thirdPartyUpdateDescription,
];
