import { expect, it } from 'vitest';
import { formatDate } from './date';

it('formate une date en français, sans décalage de fuseau', () => {
	expect(formatDate('2026-01-01')).toBe('1 janvier 2026');
});
