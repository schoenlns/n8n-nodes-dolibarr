import type { INodeProperties } from 'n8n-workflow';
import { contactGetManyDescription } from './getAll';
import { contactGetDescription } from './get';
import { contactCreateDescription } from './create';
import { contactUpdateDescription } from './update';

const showOnlyForContacts = {
	resource: ['contact'],
};

export const contactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForContacts },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a contact',
				description: 'Create a new contact',
				routing: { request: { method: 'POST', url: '/contacts' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a contact',
				description: 'Delete a contact',
				routing: { request: { method: 'DELETE', url: '=/contacts/{{$parameter.contactId}}' } },
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a contact',
				description: 'Get the data of a single contact',
				routing: { request: { method: 'GET', url: '=/contacts/{{$parameter.contactId}}' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many contacts',
				description: 'Get many contacts',
				routing: { request: { method: 'GET', url: '/contacts' } },
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a contact',
				description: 'Update an existing contact',
				routing: { request: { method: 'PUT', url: '=/contacts/{{$parameter.contactId}}' } },
			},
		],
		default: 'getAll',
	},
	...contactGetDescription,
	...contactGetManyDescription,
	...contactCreateDescription,
	...contactUpdateDescription,
];
