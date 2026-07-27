import type { INodeProperties } from 'n8n-workflow';
import { memberSelect, suiviTypeSelect } from '../../shared/descriptions';

const showOnlyForCreate = {
	resource: ['suivi'],
	operation: ['create'],
};

export const suiviCreateDescription: INodeProperties[] = [
	{
		...memberSelect,
		description: 'The member this follow-up is attached to',
		displayOptions: { show: showOnlyForCreate },
		routing: { send: { type: 'body', property: 'fk_adherent' } },
	},
	{
		...suiviTypeSelect,
		displayOptions: { show: showOnlyForCreate },
		routing: { send: { type: 'body', property: 'fk_type' } },
	},
	{
		displayName: 'Subject',
		name: 'sujet',
		type: 'string',
		default: '',
		required: true,
		description: 'Short subject of the interaction',
		displayOptions: { show: showOnlyForCreate },
		routing: { send: { type: 'body', property: 'sujet' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForCreate },
		options: [
			{
				displayName: 'Assigned User ID',
				name: 'fk_user_assign',
				type: 'number',
				default: 0,
				description:
					'Dolibarr user (rowid) in charge of this follow-up. Rejected by the API if the user does not exist.',
				routing: { send: { type: 'body', property: 'fk_user_assign' } },
			},
			{
				displayName: 'Author',
				name: 'auteur',
				type: 'string',
				default: '',
				description: 'Free-text author (defaults to the API user login)',
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
				description: 'Date of the interaction. Defaults to now if left empty.',
				routing: { send: { type: 'body', property: 'date_suivi' } },
			},
			{
				displayName: 'Outcome Name or ID',
				name: 'fk_resultat',
				type: 'options',
				typeOptions: { loadOptionsMethod: 'getSuiviResultats' },
				default: 0,
				description:
					'Outcome of the interaction (reached, no answer, to call back, …). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				routing: { send: { type: 'body', property: 'fk_resultat' } },
			},
			{
				displayName: 'Priority',
				name: 'priorite',
				type: 'options',
				options: [
					{ name: 'Low', value: 0 },
					{ name: 'Normal', value: 1 },
					{ name: 'High', value: 2 },
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
		],
	},
];
