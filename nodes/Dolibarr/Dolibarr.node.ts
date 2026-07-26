import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { thirdPartyDescription } from './resources/thirdParty';
import { productDescription } from './resources/product';
import { invoiceDescription } from './resources/invoice';
import { invoiceLineDescription } from './resources/invoiceLine';
import { contactDescription } from './resources/contact';
import { memberDescription } from './resources/member';
import { subscriptionDescription } from './resources/subscription';
import { getThirdParties } from './listSearch/getThirdParties';
import { getProducts } from './listSearch/getProducts';
import { getMemberTypes } from './listSearch/getMemberTypes';
import { getMembers } from './listSearch/getMembers';

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
					{ name: 'Member', value: 'member' },
					{ name: 'Product', value: 'product' },
					{ name: 'Subscription', value: 'subscription' },
					{ name: 'Third Party', value: 'thirdParty' },
				],
				default: 'thirdParty',
			},
			...thirdPartyDescription,
			...productDescription,
			...invoiceDescription,
			...invoiceLineDescription,
			...contactDescription,
			...memberDescription,
			...subscriptionDescription,
		],
	};

	methods = {
		listSearch: {
			getThirdParties,
			getProducts,
			getMemberTypes,
			getMembers,
		},
	};
}
