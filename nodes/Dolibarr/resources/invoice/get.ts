import type { INodeProperties } from 'n8n-workflow';
import { idField } from '../../shared/descriptions';

export const invoiceGetDescription: INodeProperties[] = [
	{
		...idField('Invoice', 'invoiceId'),
		displayOptions: {
			show: { resource: ['invoice'], operation: ['get', 'delete', 'validate'] },
		},
	},
];
