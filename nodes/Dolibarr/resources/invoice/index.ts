import type { INodeProperties } from 'n8n-workflow';
import { invoiceGetManyDescription } from './getAll';
import { invoiceGetDescription } from './get';
import { invoiceCreateDescription } from './create';

const showOnlyForInvoices = {
	resource: ['invoice'],
};

export const invoiceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForInvoices },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an invoice',
				description: 'Create a new (draft) invoice',
				routing: { request: { method: 'POST', url: '/invoices' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an invoice',
				description: 'Delete an invoice',
				routing: { request: { method: 'DELETE', url: '=/invoices/{{$parameter.invoiceId}}' } },
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an invoice',
				description: 'Get the data of a single invoice',
				routing: { request: { method: 'GET', url: '=/invoices/{{$parameter.invoiceId}}' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many invoices',
				description: 'Get many invoices',
				routing: { request: { method: 'GET', url: '/invoices' } },
			},
			{
				name: 'Validate',
				value: 'validate',
				action: 'Validate an invoice',
				description: 'Validate a draft invoice (assigns its final reference)',
				routing: {
					request: { method: 'POST', url: '=/invoices/{{$parameter.invoiceId}}/validate' },
				},
			},
		],
		default: 'getAll',
	},
	...invoiceGetDescription,
	...invoiceGetManyDescription,
	...invoiceCreateDescription,
];
