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
				displayName: 'Assigned User ID',
				name: 'assigne',
				type: 'number',
				default: 0,
				description:
					'Filter on the assigned Dolibarr user (rowid). Use 0 to list only unassigned follow-ups.',
				routing: { request: { qs: { assigne: '={{$value}}' } } },
			},
			{
				displayName: 'Member ID',
				name: 'adherent',
				type: 'number',
				default: 0,
				description: 'Filter on a member (Dolibarr rowid)',
				routing: { request: { qs: { adherent: '={{$value}}' } } },
			},
			{
				displayName: 'Priority',
				name: 'priorite',
				type: 'options',
				options: [
					{ name: 'Low (1 Star)', value: 1 },
					{ name: 'Normal (2 Stars)', value: 2 },
					{ name: 'High (3 Stars)', value: 3 },
				],
				default: 1,
				routing: { request: { qs: { priorite: '={{$value}}' } } },
			},
			{
				displayName: 'Sort Field',
				name: 'sortfield',
				type: 'options',
				options: [
					{ name: 'Creation Date', value: 's.date_creation' },
					{ name: 'Follow-Up Date', value: 's.date_suivi' },
					{ name: 'Priority', value: 's.priorite' },
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
