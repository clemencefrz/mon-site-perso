import { describe, expect, it } from 'vitest';
import { loadPosts, parsePost } from './posts';

const post = (fields: string, body = 'Contenu') => `---\n${fields}\n---\n${body}`;

describe('parsePost', () => {
	it('lit le frontmatter et rend le Markdown en HTML', () => {
		const result = parsePost(
			'mon-article',
			post('title: Mon titre\ndate: 2026-01-02\ndescription: "Un résumé : court"', '**gras**')
		);

		expect(result).toEqual({
			slug: 'mon-article',
			title: 'Mon titre',
			date: '2026-01-02',
			description: 'Un résumé : court',
			html: '<p><strong>gras</strong></p>\n'
		});
	});

	it('accepte les fins de ligne Windows', () => {
		const raw = '---\r\ntitle: T\r\ndate: 2026-01-02\r\ndescription: D\r\n---\r\nTexte';
		expect(parsePost('a', raw).title).toBe('T');
	});

	it('rejette un article sans frontmatter', () => {
		expect(() => parsePost('a', 'Juste du texte')).toThrow('frontmatter manquant');
	});

	it.each(['title', 'date', 'description'])('rejette un article sans %s', (missing) => {
		const fields = { title: 'T', date: '2026-01-02', description: 'D' };
		const lines = Object.entries(fields)
			.filter(([key]) => key !== missing)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n');
		expect(() => parsePost('a', post(lines))).toThrow(`champ "${missing}" manquant`);
	});

	it.each(['02/01/2026', '2026-13-01', '2026-02-30'])('rejette la date %s', (date) => {
		expect(() => parsePost('a', post(`title: T\ndate: ${date}\ndescription: D`))).toThrow(
			'date invalide'
		);
	});
});

describe('loadPosts', () => {
	it('déduit le slug du nom de fichier et trie du plus récent au plus ancien', () => {
		const result = loadPosts({
			'/src/posts/ancien.md': post('title: Ancien\ndate: 2025-05-01\ndescription: D'),
			'/src/posts/recent.md': post('title: Récent\ndate: 2026-03-01\ndescription: D')
		});

		expect(result.map(({ slug }) => slug)).toEqual(['recent', 'ancien']);
	});
});
