import { expect, it } from 'vitest';
import { allTechs, experiences } from './experiences';
import { techIcon, techsWithoutIcon } from './techIcons';

it('renvoie le logo d’une technologie connue', () => {
	expect(techIcon('React')?.slug).toBe('react');
	expect(techIcon('Node.js')?.slug).toBe('nodedotjs');
});

it('ne renvoie rien pour une technologie sans logo', () => {
	expect(techIcon('SQL')).toBeUndefined();
	expect(techIcon('Techno inconnue')).toBeUndefined();
});

// Évite qu'une nouvelle techno, ou une faute de frappe dans les données, perde son logo sans qu'on le voie.
it('a un logo pour chaque technologie des expériences, sauf celles listées sans logo', () => {
	const missing = allTechs(experiences).filter(
		(tech) => !techIcon(tech) && !techsWithoutIcon.includes(tech)
	);

	expect(missing).toEqual([]);
});
