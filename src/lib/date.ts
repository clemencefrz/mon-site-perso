export function formatDate(date: string): string {
	return new Date(`${date}T00:00:00Z`).toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}

/** Durée entre deux dates AAAA-MM-JJ, en comptant le mois de début et le mois de fin. */
export function formatDuration(startDate: string, endDate: string): string {
	const [startYear, startMonth] = startDate.split('-').map(Number);
	const [endYear, endMonth] = endDate.split('-').map(Number);
	const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;

	const parts = [];
	if (years > 0) parts.push(years === 1 ? '1 an' : `${years} ans`);
	if (months > 0) parts.push(`${months} mois`);
	return parts.join(' ');
}

export function formatMonth(date: string): string {
	return new Date(`${date}T00:00:00Z`).toLocaleDateString('fr-FR', {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}
