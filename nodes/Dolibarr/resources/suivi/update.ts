import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpdate = {
	resource: ['suivi'],
	operation: ['update'],
};

export const suiviUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForUpdate },
		options: [
			{
				displayName: 'Author',
				name: 'auteur',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'auteur' } },
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: { rows: 4 },
				default: '',
				routing: { send: { type: 'body', property: 'description' } },
			},
			{
				displayName: 'Follow-Up Date',
				name: 'date_suivi',
				type: 'dateTime',
				default: '',
				routing: { send: { type: 'body', property: 'date_suivi' } },
			},
			{
				displayName: 'Member ID',
				name: 'fk_adherent',
				type: 'number',
				default: 0,
				description: 'Reassign to another member (Dolibarr rowid)',
				routing: { send: { type: 'body', property: 'fk_adherent' } },
			},
			{
				displayName: 'Reminder Date',
				name: 'date_rappel',
				type: 'dateTime',
				default: '',
				routing: { send: { type: 'body', property: 'date_rappel' } },
			},
			{
				displayName: 'Status',
				name: 'statut',
				type: 'options',
				options: [
					{ name: 'To Do', value: 0 },
					{ name: 'Done', value: 1 },
					{ name: 'Cancelled', value: 2 },
				],
				default: 0,
				routing: { send: { type: 'body', property: 'statut' } },
			},
			{
				displayName: 'Subject',
				name: 'sujet',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'sujet' } },
			},
			{
				displayName: 'Type ID',
				name: 'fk_type',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'fk_type' } },
			},
		],
	},
];
