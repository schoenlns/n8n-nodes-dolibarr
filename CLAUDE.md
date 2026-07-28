# CLAUDE.md

n8n community node for the **Dolibarr** ERP/CRM REST API. Published on npm as
`n8n-nodes-dolibarr-rest`.

## Commands

```bash
npm run build        # compile TypeScript to dist/
npm run lint         # n8n community-node lint rules (also runs in CI)
npm run lint:fix
npm run dev          # local n8n with this node loaded, hot reload
npm run release      # interactive: lint, build, bump, changelog, tag, push
```

CI (`.github/workflows/ci.yml`) runs `lint` then `build` on every push/PR to `main`.
Pushing a version tag triggers `publish.yml`, which publishes to npm with provenance.
**Always run `npm run lint` before considering a change done** — the n8n rules are strict
and reject things plain TypeScript accepts.

## Architecture

This is a **declarative node**: there is no `execute()` method anywhere. Every operation is
expressed as `routing` metadata on `INodeProperties`, and n8n builds the HTTP request from it.
Don't add an `execute()` — extend the declarative descriptions instead.

```
credentials/DolibarrApi.credentials.ts   API key (DOLAPIKEY header) + /status test request
nodes/Dolibarr/
  Dolibarr.node.ts                       node shell: resource list + methods registry
  shared/descriptions.ts                 reusable property builders (see below)
  shared/transport.ts                    dolibarrApiRequest() — only for listSearch/loadOptions
  shared/utils.ts                         escapeSqlFilterValue()
  listSearch/                            searchable dropdowns (resourceLocator "From List")
  loadOptions/                           plain options dropdowns
  resources/<name>/
    index.ts                             Operation selector + routing (method + URL) per op
    get.ts getAll.ts create.ts update.ts  the properties for each operation
```

`resources/<name>/index.ts` exports `<name>Description`, which `Dolibarr.node.ts` spreads into
`properties`. Operations with no fields of their own (`delete`, `validate`) have no file — their
ID field is declared in `get.ts` with the extra operation listed in `displayOptions.show.operation`
(see [invoice/get.ts](nodes/Dolibarr/resources/invoice/get.ts)).

Only `listSearch`/`loadOptions` methods call the API imperatively, via `dolibarrApiRequest`.

## Adding a resource

1. Create `resources/<name>/` with `index.ts` + one file per operation.
2. Register in `Dolibarr.node.ts`: import the description, add it to the `Resource` options
   array **in alphabetical order by display name**, and spread it into `properties`.
3. Update the operations table in [README.md](README.md).

## Conventions

**Reuse the shared builders** rather than redeclaring properties:
`thirdPartySelect`, `productSelect`, `memberSelect`, `memberTypeSelect`, `suiviTypeSelect`
(resourceLocators), `idField(displayName, name)`, `paginationProperties(resource)`,
`listFilters(resource)`. Spread and override: `{ ...memberSelect, displayOptions, routing }`.

**Property shape.** Each operation file defines a local
`const showOnlyForX = { resource: ['x'], operation: ['y'] }` and puts it on every property's
`displayOptions.show`. Required inputs are top-level properties; everything optional goes in a
single `collection` named `additionalFields` (create/update) or `filters` (getAll).

**Routing.** Body fields use `routing: { send: { type: 'body', property: 'dolibarr_field' } }`;
query params use `routing: { request: { qs: { name: '={{$value}}' } } }`. URL params interpolate
the parameter directly: `url: '=/invoices/{{$parameter.invoiceId}}'`.

**Lint rules that bite.** Options arrays (resources, operations, collection fields, dropdown
values) must be sorted alphabetically by `name`. A field backed by `loadOptionsMethod` must be
named `"<Label> Name or ID"` and its description must end with the boilerplate
"Choose from the list, or specify an ID using an
`<a href="https://docs.n8n.io/code/expressions/">expression</a>`." Every operation needs an
`action`. Limit fields need `description: 'Max number of results to return'`.

**Language.** Code comments are written in French. User-facing strings (`displayName`,
`description`, `placeholder`) are English — a few older ones are still French; prefer English
for anything new.

**`listSearch`/`loadOptions` must never throw.** Wrap the request in `try/catch` and return an
empty list on failure, so an uninstalled Dolibarr module doesn't break the node UI.

## Dolibarr API notes

- Base URL ends with `/api/index.php`; auth is the `DOLAPIKEY` header.
- **Pagination**: `Return All` uses generic pagination with `limit=100` and an incrementing
  `page`, stopping when a page returns fewer than 100 rows. Dolibarr caps `limit` at 100.
- **`sqlfilters`**: SQL-like expressions such as `(t.nom:like:'%Doe%') AND (t.datec:>=:'2024-01-01')`.
  Any user value interpolated into one must go through `escapeSqlFilterValue()`.
- **Invoices** are created as drafts (header only) — add lines via the `Invoice Line` resource,
  then call the `Validate` operation.
- **Follow-Up (CRM)** hits `/relationadherent/*`, which comes from a **custom Dolibarr module**,
  not core Dolibarr. Those routes are absent on a stock instance; that's why its dropdowns
  degrade to empty lists.
