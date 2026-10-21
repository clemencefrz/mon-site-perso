import { Marked } from 'marked';

export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	description: string;
};

export type Post = PostMeta & { html: string };

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Identifiant d'ancre d'un titre : « 1.1. Ma découverte ! » donne « 11-ma-decouverte ». */
export function slugify(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/[\s-]+/g, '-');
}

/** Rend le Markdown en HTML, en donnant un identifiant à chaque titre pour pouvoir y faire un lien. */
export function renderMarkdown(markdown: string): string {
	const usedIds = new Map<string, number>();
	const marked = new Marked({
		renderer: {
			heading({ tokens, depth, text }) {
				const base = slugify(text) || 'section';
				const count = usedIds.get(base) ?? 0;
				usedIds.set(base, count + 1);
				const id = count === 0 ? base : `${base}-${count}`;
				return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
			}
		}
	});
	return marked.parse(markdown, { async: false });
}

function isValidDate(date: string): boolean {
	if (!DATE.test(date)) return false;
	const parsed = new Date(`${date}T00:00:00Z`);
	return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

export function parsePost(slug: string, raw: string): Post {
	const match = raw.match(FRONTMATTER);
	if (!match) throw new Error(`Article "${slug}" : frontmatter manquant`);

	const fields: Record<string, string> = {};
	for (const line of match[1].split(/\r?\n/)) {
		const separator = line.indexOf(':');
		if (separator === -1) continue;
		const key = line.slice(0, separator).trim();
		const value = line
			.slice(separator + 1)
			.trim()
			.replace(/^(["'])(.*)\1$/, '$2');
		fields[key] = value;
	}

	for (const key of ['title', 'date', 'description']) {
		if (!fields[key]) throw new Error(`Article "${slug}" : champ "${key}" manquant`);
	}
	if (!isValidDate(fields.date)) {
		throw new Error(`Article "${slug}" : date invalide "${fields.date}" (attendu AAAA-MM-JJ)`);
	}

	return {
		slug,
		title: fields.title,
		date: fields.date,
		description: fields.description,
		html: renderMarkdown(match[2])
	};
}

export function loadPosts(files: Record<string, string>): Post[] {
	return Object.entries(files)
		.map(([path, raw]) => parsePost(path.split('/').pop()!.replace(/\.md$/, ''), raw))
		.sort((a, b) => b.date.localeCompare(a.date));
}

const files = import.meta.glob<string>('/src/posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

export const posts = loadPosts(files);
