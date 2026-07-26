import type {
	IHookFunctions,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';

/**
 * Effectue une requête authentifiée vers l'API REST de Dolibarr.
 *
 * La clé DOLAPIKEY est injectée automatiquement par les credentials `dolibarrApi`.
 * La `baseUrl` (qui se termine par `/api/index.php`) est lue depuis ces mêmes
 * credentials et préfixée au `resource` passé en argument.
 *
 * Utilisée principalement par les méthodes `listSearch` (les opérations classiques
 * passent par le routing déclaratif du node).
 */
export async function dolibarrApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	qs: IDataObject = {},
	body: IDataObject | undefined = undefined,
) {
	const credentials = await this.getCredentials('dolibarrApi');
	const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

	const options: IHttpRequestOptions = {
		method,
		qs,
		body,
		url: `${baseUrl}${resource}`,
		json: true,
	};

	return this.helpers.httpRequestWithAuthentication.call(this, 'dolibarrApi', options);
}
