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
				displayName: 'Assigned User ID',
				name: 'fk_user_assign',
				type: 'number',
				default: 0,
				description:
					'Dolibarr user (rowid) in charge of this follow-up. Use 0 to clear the assignment.',
				routing: { send: { type: 'body', property: 'fk_user_assign' } },
			},
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
				displayName: 'Outcome Name or ID',
				name: 'fk_resultat',
				type: 'options',
				typeOptions: { loadOptionsMethod: 'getSuiviResultats' },
				default: 0,
				description:
					'Outcome of the interaction. Use 0 to clear it. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				routing: { send: { type: 'body', property: 'fk_resultat' } },
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
				routing: { send: { type: 'body', property: 'priorite' } },
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
