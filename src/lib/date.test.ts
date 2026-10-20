import { describe, expect, it } from 'vitest';
import { formatDate, formatDuration, formatMonth } from './date';

describe('formatDuration', () => {
	it('compte le mois de début et le mois de fin', () => {
		expect(formatDuration('2025-04-07', '2025-04-11')).toBe('1 mois');
		expect(formatDuration('2025-01-06', '2025-06-20')).toBe('6 mois');
	});

	it('affiche les années et les mois', () => {
		expect(formatDuration('2022-10-10', '2024-12-31')).toBe('2 ans 3 mois');
		expect(formatDuration('2024-01-01', '2025-01-01')).toBe('1 an 1 mois');
	});

	it("n'affiche pas « 0 mois » pour un nombre rond d'années", () => {
		expect(formatDuration('2024-01-01', '2024-12-31')).toBe('1 an');
	});
});

it('formate une date en français, sans décalage de fuseau', () => {
	expect(formatDate('2026-01-01')).toBe('1 janvier 2026');
});

it('formate un mois et une année en français, sans décalage de fuseau', () => {
	expect(formatMonth('2026-01-01')).toBe('janvier 2026');
});
