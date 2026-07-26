import type { INodeProperties } from 'n8n-workflow';
import { idField } from '../../shared/descriptions';
import { invoiceLineAddDescription } from './create';
import { invoiceLineUpdateDescription } from './update';

const showOnlyForInvoiceLines = {
	resource: ['invoiceLine'],
};

export const invoiceLineDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForInvoiceLines },
		options: [
			{
				name: 'Add',
				value: 'add',
				action: 'Add a line to an invoice',
				description: 'Add a new line to an invoice',
				routing: {
					request: { method: 'POST', url: '=/invoices/{{$parameter.invoiceId}}/lines' },
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an invoice line',
				description: 'Delete a line from an invoice',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/invoices/{{$parameter.invoiceId}}/lines/{{$parameter.lineId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many invoice lines',
				description: 'Get many lines of an invoice',
				routing: {
					request: { method: 'GET', url: '=/invoices/{{$parameter.invoiceId}}/lines' },
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an invoice line',
				description: 'Update an existing invoice line',
				routing: {
					request: {
						method: 'PUT',
						url: '=/invoices/{{$parameter.invoiceId}}/lines/{{$parameter.lineId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...idField('Invoice', 'invoiceId'),
		description: 'ID (rowid) of the invoice the line belongs to',
		displayOptions: { show: showOnlyForInvoiceLines },
	},
	{
		...idField('Line', 'lineId'),
		description: 'ID (rowid) of the invoice line',
		displayOptions: {
			show: { resource: ['invoiceLine'], operation: ['update', 'delete'] },
		},
	},
	...invoiceLineAddDescription,
	...invoiceLineUpdateDescription,
];
