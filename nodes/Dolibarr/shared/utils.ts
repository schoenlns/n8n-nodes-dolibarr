/**
 * Échappe une valeur destinée à un `sqlfilters` Dolibarr.
 *
 * Dolibarr utilise des filtres du type `(t.nom:like:'%valeur%')`. On neutralise
 * les apostrophes et les caractères de contrôle pour éviter de casser la requête.
 */
export function escapeSqlFilterValue(value: string): string {
	return value.replace(/['\\]/g, '').replace(/[\r\n]/g, ' ');
}
