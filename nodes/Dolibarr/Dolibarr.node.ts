import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { thirdPartyDescription } from './resources/thirdParty';
import { productDescription } from './resources/product';
import { invoiceDescription } from './resources/invoice';
import { invoiceLineDescription } from './resources/invoiceLine';
import { contactDescription } from './resources/contact';
import { getThirdParties } from './listSearch/getThirdParties';
import { getProducts } from './listSearch/getProducts';

export class Dolibarr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dolibarr',
		name: 'dolibarr',
		icon: 'file:dolibarr.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Dolibarr ERP/CRM REST API',
		defaults: {
			name: 'Dolibarr',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'dolibarrApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Contact', value: 'contact' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Invoice Line', value: 'invoiceLine' },
					{ name: 'Product', value: 'product' },
					{ name: 'Third Party', value: 'thirdParty' },
				],
				default: 'thirdParty',
			},
			...thirdPartyDescription,
			...productDescription,
			...invoiceDescription,
			...invoiceLineDescription,
			...contactDescription,
		],
	};

	methods = {
		listSearch: {
			getThirdParties,
			getProducts,
		},
	};
}
