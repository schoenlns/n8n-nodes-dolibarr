# n8n-nodes-dolibarr-rest

This is an n8n community node. It lets you interact with the **[Dolibarr](https://www.dolibarr.org/) ERP/CRM** REST API from your n8n workflows.

Dolibarr is an open-source ERP/CRM to manage third parties (customers, prospects, suppliers), contacts, products/services and invoices.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Compatibility](#compatibility) · [Development](#development) · [Resources](#resources)

## Installation

Follow the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n documentation, and install the package `n8n-nodes-dolibarr-rest`.

## Credentials

The node authenticates against Dolibarr's REST API using an **API key** (the `DOLAPIKEY` HTTP header).

1. In Dolibarr, enable the module **Web services API REST** (Home → Setup → Modules).
2. Open your user card and generate/copy the **API key**.
3. In n8n, create new **Dolibarr API** credentials and fill in:
   - **Base URL** — the base URL of your instance's REST API, ending with `/api/index.php`
     (e.g. `https://erp.example.com/api/index.php`).
   - **API Key (DOLAPIKEY)** — the key generated above.

Click **Test** — n8n calls `GET /status` to validate the connection.

## Operations

The node exposes the following resources and operations. List (`Get Many`) operations support
pagination (**Return All** / **Limit**) and optional sort/`sqlfilters` options.

| Resource        | Operations                                            |
| --------------- | ----------------------------------------------------- |
| **Third Party** | Get Many, Get, Create, Update, Delete                 |
| **Contact**     | Get Many, Get, Create, Update, Delete                 |
| **Product**     | Get Many, Get, Create, Update, Delete                 |
| **Invoice**     | Get Many, Get, Create, Delete, Validate               |

Third parties and products can be selected from a searchable dropdown (backed by the Dolibarr
`sqlfilters` search), or by entering their numeric ID directly.

> **Note on invoices:** the *Create* operation creates a **draft** invoice (header only). Add lines
> afterwards via the Dolibarr `POST /invoices/{id}/lines` endpoint (e.g. with an HTTP Request node),
> then use the *Validate* operation to finalize it.

### `sqlfilters` syntax

Dolibarr list endpoints accept a powerful SQL-like filter, available under **Options → SQL Filters**:

```
(t.nom:like:'%Doe%') AND (t.datec:>=:'2024-01-01')
```

See the [Dolibarr API documentation](https://wiki.dolibarr.org/index.php?title=Module_Web_Services_API_REST_(developer)) for the full operator list.

## Compatibility

- Requires n8n with community nodes support.
- Tested against the Dolibarr REST API v1 (`/api/index.php`).

## Development

```bash
npm install      # install dependencies
npm run build    # compile TypeScript to dist/
npm run lint     # run n8n community-node lint rules
npm run dev      # run a local n8n with this node loaded (hot reload)
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Dolibarr REST API (developer) wiki](https://wiki.dolibarr.org/index.php?title=Module_Web_Services_API_REST_(developer))

## License

[MIT](LICENSE.md)
