import type { INodeProperties } from 'n8n-workflow';
import { productSelect } from '../../shared/descriptions';

export const productGetDescription: INodeProperties[] = [
	{
		...productSelect,
		displayOptions: { show: { resource: ['product'], operation: ['get', 'update', 'delete'] } },
	},
];
