import { describe, expect, it } from 'vitest';
import {
	allContractTypes,
	allTechs,
	experiences,
	filterExperiences,
	formatPeriod,
	sortByStartDateDesc,
	type Experience
} from './experiences';

const experience = (startDate: string): Experience => ({
	title: startDate,
	startDate,
	contractType: 'CDI',
	context: '',
	missions: [],
	stack: { front: [], back: [], tools: [] }
});

it('trie les expériences de la plus récente à la plus ancienne', () => {
	const list = [experience('2023-01-01'), experience('2025-06-01'), experience('2024-03-01')];

	expect(sortByStartDateDesc(list).map((e) => e.startDate)).toEqual([
		'2025-06-01',
		'2024-03-01',
		'2023-01-01'
	]);
});

it('ne modifie pas la liste de départ', () => {
	const list = [experience('2023-01-01'), experience('2025-06-01')];

	sortByStartDateDesc(list);

	expect(list.map((e) => e.startDate)).toEqual(['2023-01-01', '2025-06-01']);
});

it('utilise des dates au format AAAA-MM-JJ', () => {
	for (const { startDate, endDate } of experiences) {
		expect(startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		if (endDate) expect(endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	}
});

const withStack = (
	title: string,
	contractType: Experience['contractType'],
	stack: Experience['stack']
): Experience => ({ ...experience('2024-01-01'), title, contractType, stack });

const svelteFreelance = withStack('Svelte', 'Auto-entreprise', {
	front: ['Svelte'],
	back: ['Node.js'],
	tools: []
});
const reactCdi = withStack('React', 'CDI', {
	front: ['React'],
	back: ['Node.js'],
	tools: ['Docker']
});
const wordpressBenevole = withStack('WordPress', 'Bénévole', {
	front: [],
	back: [],
	tools: ['Wordpress']
});
const list = [svelteFreelance, reactCdi, wordpressBenevole];

describe('allTechs', () => {
	it('regroupe front, back et outils, sans doublon et par ordre alphabétique', () => {
		expect(allTechs(list)).toEqual(['Docker', 'Node.js', 'React', 'Svelte', 'Wordpress']);
	});
});

describe('allContractTypes', () => {
	it('liste les types de travail sans doublon', () => {
		expect(allContractTypes([...list, reactCdi])).toEqual(['Auto-entreprise', 'Bénévole', 'CDI']);
	});
});

describe('filterExperiences', () => {
	const titles = (filtered: Experience[]) => filtered.map((e) => e.title);

	it('garde tout quand aucun filtre n’est choisi', () => {
		expect(titles(filterExperiences(list, { techs: [], contractTypes: [] }))).toEqual([
			'Svelte',
			'React',
			'WordPress'
		]);
	});

	it('garde les expériences qui ont au moins une des technologies choisies', () => {
		expect(
			titles(filterExperiences(list, { techs: ['Svelte', 'Docker'], contractTypes: [] }))
		).toEqual(['Svelte', 'React']);
	});

	it('cherche aussi dans le back et les outils', () => {
		expect(titles(filterExperiences(list, { techs: ['Node.js'], contractTypes: [] }))).toEqual([
			'Svelte',
			'React'
		]);
	});

	it('garde les expériences qui ont un des types de travail choisis', () => {
		expect(
			titles(filterExperiences(list, { techs: [], contractTypes: ['CDI', 'Bénévole'] }))
		).toEqual(['React', 'WordPress']);
	});

	it('combine les deux filtres', () => {
		expect(titles(filterExperiences(list, { techs: ['Node.js'], contractTypes: ['CDI'] }))).toEqual(
			['React']
		);
	});
});

describe('formatPeriod', () => {
	const today = '2026-10-20';

	it('affiche les deux dates et la durée quand il y a une date de fin', () => {
		expect(formatPeriod({ startDate: '2022-10-10', endDate: '2024-12-31' }, today)).toBe(
			'octobre 2022 – décembre 2024 · 2 ans 3 mois'
		);
	});

	it('affiche « Depuis » et la durée jusqu’à aujourd’hui pour une expérience en cours', () => {
		expect(formatPeriod({ startDate: '2024-09-30', current: true }, today)).toBe(
			'Depuis septembre 2024 · 2 ans 2 mois'
		);
	});

	it('affiche seulement le mois, sans durée, pour une expérience ponctuelle', () => {
		expect(formatPeriod({ startDate: '2025-01-01' }, today)).toBe('janvier 2025');
		expect(formatPeriod({ startDate: '2025-01-01', current: false }, today)).toBe('janvier 2025');
	});

	it('privilégie la date de fin si elle existe, même avec current', () => {
		expect(
			formatPeriod({ startDate: '2025-01-06', endDate: '2025-06-20', current: true }, today)
		).toBe('janvier 2025 – juin 2025 · 6 mois');
	});
});
