import type { INodeProperties } from 'n8n-workflow';
import { paginationProperties } from '../../shared/descriptions';

const showForGetAll = { resource: ['suivi'], operation: ['getAll'] };

export const suiviGetManyDescription: INodeProperties[] = [
	...paginationProperties('suivi'),
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: showForGetAll },
		options: [
			{
				displayName: 'Member ID',
				name: 'adherent',
				type: 'number',
				default: 0,
				description: 'Filter on a member (Dolibarr rowid)',
				routing: { request: { qs: { adherent: '={{$value}}' } } },
			},
			{
				displayName: 'Sort Field',
				name: 'sortfield',
				type: 'options',
				options: [
					{ name: 'Creation Date', value: 's.date_creation' },
					{ name: 'Follow-Up Date', value: 's.date_suivi' },
					{ name: 'Status', value: 's.statut' },
					{ name: 'Subject', value: 's.sujet' },
				],
				default: 's.date_suivi',
				routing: { request: { qs: { sortfield: '={{$value}}' } } },
			},
			{
				displayName: 'Sort Order',
				name: 'sortorder',
				type: 'options',
				options: [
					{ name: 'ASC', value: 'ASC' },
					{ name: 'DESC', value: 'DESC' },
				],
				default: 'DESC',
				routing: { request: { qs: { sortorder: '={{$value}}' } } },
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'To Do', value: 0 },
					{ name: 'Done', value: 1 },
					{ name: 'Cancelled', value: 2 },
				],
				default: 0,
				routing: { request: { qs: { status: '={{$value}}' } } },
			},
		],
	},
];
