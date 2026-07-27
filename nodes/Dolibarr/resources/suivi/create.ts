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
