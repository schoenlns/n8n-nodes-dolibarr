import {
	Icon,
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DolibarrApi implements ICredentialType {
	name = 'dolibarrApi';
	displayName = 'Dolibarr API';
	icon: Icon = 'file:../nodes/Dolibarr/dolibarr.svg';
	documentationUrl =
		'https://wiki.dolibarr.org/index.php?title=Module_Web_Services_API_REST_(developer)';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			required: true,
			default: '',
			placeholder: 'https://erp.schoendorff.fr/api/index.php',
			description:
				"URL de base de l'API REST de ton instance Dolibarr (termine par /api/index.php).",
		},
		{
			displayName: 'API Key (DOLAPIKEY)',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true }, // masque la valeur dans l'UI
			required: true,
			default: '',
			description: 'Clé API générée dans la fiche utilisateur Dolibarr.',
		},
	];

	// Injecte automatiquement le header DOLAPIKEY dans TOUTES les requêtes du node.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				DOLAPIKEY: '={{$credentials.apiKey}}',
			},
		},
	};

	// Requête de test : n8n l'exécute quand on clique sur « Test » à l'enregistrement.
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/status',
			method: 'GET',
		},
	};
}
