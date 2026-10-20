export type Experience = {
	title: string;
	/** Absente quand le titre est déjà le nom du projet. */
	company?: string;
	/** Format AAAA-MM-JJ */
	startDate: string;
	/** Format AAAA-MM-JJ. Absente si l'expérience est en cours. */
	endDate?: string;
	contractType: 'CDI' | 'Auto-entreprise' | 'Bénévole';
	/** Un paragraphe par ligne : seul le premier est affiché par défaut. */
	context: string;
	missions: string[];
	stack: { front: string[]; back: string[]; tools: string[] };
	siteUrl?: string;
	githubUrl?: string;
	/** Chemin d'une image du dossier static/ */
	logo?: string;
};

export function sortByStartDateDesc(list: Experience[]): Experience[] {
	return [...list].sort((a, b) => b.startDate.localeCompare(a.startDate));
}

function techsOf(experience: Experience): string[] {
	const { front, back, tools } = experience.stack;
	return [...front, ...back, ...tools];
}

function uniqueSorted(values: string[]): string[] {
	return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
}

/** Toutes les technologies utilisées, sans doublon, par ordre alphabétique. */
export function allTechs(list: Experience[]): string[] {
	return uniqueSorted(list.flatMap(techsOf));
}

/** Tous les types de travail présents, sans doublon, par ordre alphabétique. */
export function allContractTypes(list: Experience[]): string[] {
	return uniqueSorted(list.map((experience) => experience.contractType));
}

export type ExperienceFilters = { techs: string[]; contractTypes: string[] };

/**
 * Garde les expériences qui utilisent au moins une des technologies choisies
 * ET qui ont un des types de travail choisis. Un filtre vide ne filtre rien.
 */
export function filterExperiences(list: Experience[], filters: ExperienceFilters): Experience[] {
	return list.filter((experience) => {
		const matchesTechs =
			filters.techs.length === 0 ||
			techsOf(experience).some((tech) => filters.techs.includes(tech));
		const matchesContractType =
			filters.contractTypes.length === 0 || filters.contractTypes.includes(experience.contractType);
		return matchesTechs && matchesContractType;
	});
}

// Données migrées depuis la table Notion « Portfolio Tech ».
export const experiences: Experience[] = [
	{
		title: 'Alara (SaaS)',
		startDate: '2024-01-01',
		endDate: '2025-01-01',
		contractType: 'Auto-entreprise',
		context:
			'Outil SaaS pour gérer la communication sur LinkedIn, co-développé avec Louis-Etienne Girard du début à la fin.',
		missions: [
			'Développement fullstack (NextJS, NodeJS)',
			'Architecture & implémentation des features',
			'Recueil des besoins des bêta-testeurs',
			'Conception produit : maquettes UI/UX sur Figma',
			'Déploiement sur Vercel, gestion infra',
			'Marketing & acquisition : réseaux sociaux, articles SEO, blog, newsletter',
			'Développement du programme de parrainage'
		],
		stack: {
			front: ['NextJS', 'React', 'React Hook Form', 'ShadCN', 'TailwindCSS'],
			back: ['Node.js', 'PostgreSQL', 'Prisma', 'Supabase'],
			tools: ['Figma', 'GitHub', 'Google Analytics', 'Stripe', 'Typescript', 'Vercel']
		},
		siteUrl: 'https://alarapp.com',
		logo: '/logos/alara.jpeg'
	},
	{
		title: 'Développeuse Fullstack',
		company: 'Agrisight / Javelot',
		startDate: '2025-01-06',
		endDate: '2025-06-20',
		contractType: 'CDI',
		context:
			"Agrisight est une startup appartenant à Javelot, spécialisée dans les solutions numériques pour l'après-récolte. C'est une plateforme de gestion de la supply chain post-récolte dans l'agriculture céréalière.",
		missions: [
			'Développement fullstack : interfaces React + API Node.js',
			'Participation aux revues de code & réunions produit quotidiennes',
			'Amélioration continue des outils internes et de la stack front',
			"Mise en place et intégration d'un Design System basé sur l'approche Atomic Design"
		],
		stack: {
			front: ['Headless UI', 'React', 'React Hook Form', 'Recoil', 'Relay'],
			back: ['GraphQL', 'MongoDB', 'Node.js'],
			tools: ['Docker', 'Figma', 'GitLab', 'Grafana', 'Pulumi', 'RabbitMQ', 'Sentry', 'Typescript']
		},
		siteUrl: 'https://agrisight.fr',
		logo: '/logos/agrisight.jpeg'
	},
	{
		title: 'Développeuse Fullstack',
		company: 'Polyconseil',
		startDate: '2022-10-10',
		endDate: '2024-12-31',
		contractType: 'CDI',
		context:
			'Polyconseil est une société de conseil en transformation numérique.\n📍 Projet 1 – Oneflex - Application SaaS de gestion du flex office & travail hybride\n📍 Projet 2 – Application de gestion des offres & candidatures',
		missions: [
			'Responsable du front : développement + revue de code hebdo',
			'Intégration ReactJS + ApolloGraphQL avec Material UI',
			'Support en production : bugfix, fiabilité, suivi des alertes',
			'Contribution à la stratégie produit : articles SEO + posts LinkedIn',
			"Collaboration UI avec l'équipe design (Figma)",
			"Responsable de l'accueil, du suivi technique et de l'évaluation de stagiaires au sein de l'équipe",
			"Contribution au blog interne : rédaction d'articles techniques et participation active aux revues de contenu",
			"Animation d'une formation sur les bases de l'accessibilité numérique, présentée à l'ensemble des développeurs de l'entreprise"
		],
		stack: {
			front: ['ApolloGraphQL', 'Material UI', 'React', 'React Hook Form', 'Storybook'],
			back: ['GraphQL', 'NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'SQL'],
			tools: [
				'Docker',
				'Figma',
				'GitLab',
				'Google Analytics',
				'Grafana',
				'Kibana',
				'Kubernetes',
				'Matomo',
				'Selenium WebDriver',
				'Sentry',
				'Terraform',
				'TypeORM',
				'Typescript'
			]
		},
		siteUrl: 'https://polyconseil.fr',
		logo: '/logos/polyconseil.svg'
	},
	{
		title: 'Cours Geroa',
		startDate: '2024-09-30',
		contractType: 'Auto-entreprise',
		context:
			"Nous sommes deux ingénieurs d'Anglet passionnés par l'éducation, avec pour objectif de faciliter l'accès à un enseignement de qualité au Pays Basque. Nous accompagnons les élèves et jeunes adultes dans leur progression académique, en mettant l'accent sur l'épanouissement personnel et le développement de l'esprit critique.",
		missions: [
			'Enseignement : cours particuliers et collectifs en mathématiques, physique et informatique pour lycéens et étudiants du supérieur',
			"Conception de supports pédagogiques : rédaction d'exercices personnalisés adaptés au profil et aux besoins des élèves ; correction et analyse de sujets d'examen (Bac, concours, etc.)",
			"Développement et gestion d'une plateforme en ligne : création et maintenance d'un site vitrine ; mise à disposition d'exercices interactifs avec corrections adaptées aux niveaux lycée et supérieur",
			"Stratégie de contenu & SEO : rédaction d'articles éducatifs et pédagogiques pour enrichir le site ; optimisation SEO afin d'améliorer la visibilité et l'accessibilité des ressources en ligne"
		],
		stack: {
			front: ['NextJS', 'React', 'React Hook Form', 'TailwindCSS'],
			back: ['PostgreSQL', 'Prisma', 'SQL', 'Supabase'],
			tools: ['GitHub', 'Typescript', 'Vercel']
		},
		siteUrl: 'https://cours-geroa.fr',
		githubUrl: 'https://github.com/clemencefrz/cours-geroa'
	},
	{
		title: 'Uramap',
		company: 'DataForGood',
		startDate: '2024-10-01',
		contractType: 'Bénévole',
		context:
			"Uramap est une carte participative permettant de recenser les pollutions des rivières et océans. C'est un outil collaboratif visant à sensibiliser et à mobiliser les citoyens dans la lutte contre la pollution des eaux.",
		missions: [
			"Développement fullstack de l'application",
			'Refactorisation du back-end pour améliorer la maintenabilité',
			'Optimisation continue des outils internes et de la stack front-end',
			'Refonte complète du front-end en Vue.js avec Quasar (from scratch)',
			'Recueil des besoins des bénévoles, formalisation en besoins utilisateurs, implémentation d\'une architecture front "clean"',
			'Contribution aux canaux de communication, notamment les réseaux sociaux',
			'Date de mise en production prévue : juin 2025'
		],
		stack: {
			front: ['Capacitor', 'Quasar', 'Vue'],
			back: ['API Rest', 'Axios', 'Express'],
			tools: ['AWS', 'Amazon S3', 'Docker', 'Elastic Search', 'Kibana', 'Typescript']
		},
		githubUrl: 'https://github.com/clemencefrz/uramap-front-copy',
		logo: '/logos/uramap.png'
	},
	{
		title: 'Tisse Ta Toile',
		startDate: '2025-04-07',
		endDate: '2025-04-11',
		contractType: 'Auto-entreprise',
		context:
			"L'opération Tisse ta toile convie les élèves de troisième et de seconde des collèges et lycées d'Anglet (Endarra, Cantau et Stella Maris) à assister à cinq ateliers de sensibilisation. Pour cette deuxième édition, du 7 au 11 avril, des ateliers étaient proposés : « La protection de ses données personnelles », « Les fake news », « Numérique et bien-être » mais aussi des conseils sur nos temps d'écran ou les bienfaits de la déconnexion, etc.",
		missions: [
			'Application web conçue pour sensibiliser à la confidentialité et à la protection des données personnelles grâce à une expérience interactive et pédagogique. Développée avec NextJS.'
		],
		stack: {
			front: ['NextJS', 'React', 'ShadCN', 'TailwindCSS'],
			back: ['PostgreSQL', 'Prisma', 'Supabase'],
			tools: ['Vercel']
		},
		githubUrl: 'https://github.com/clemencefrz/gamecyberquest'
	},
	{
		title: 'Aide pour mes clubs/assos',
		startDate: '2025-01-01',
		contractType: 'Bénévole',
		context:
			'Support sur le site pour mon association de trail/triathlon (https://angletfranceteam.fr/) et sur le site de mon club de basque (https://angelukoikasleak.com/).',
		missions: [],
		stack: { front: [], back: [], tools: ['Wordpress'] }
	},
	{
		title: 'Association Littérature à voix haute',
		startDate: '2025-04-30',
		endDate: '2025-06-21',
		contractType: 'Auto-entreprise',
		context:
			"Développer le site de l'association en NextJS : https://www.litteratureavoixhaute.com/",
		missions: ["Développer le site de l'association en NextJS"],
		stack: { front: ['NextJS'], back: [], tools: [] }
	},
	{
		title: 'Pitchou',
		company: 'beta.gouv',
		startDate: '2025-06-16',
		contractType: 'Auto-entreprise',
		context:
			"Pitchou est un outil numérique qui facilite la gestion et le suivi des dossiers Espèces Protégées, pour toutes les parties prenantes, de la phase amont au contrôle du respect des mesures ERC.\nSes utilisateurs principaux sont les instructeurs et instructrices Espèces Protégées, et rapidement il doit également permettre aux autres parties prenantes d'accéder et de participer aux dossiers qui les concernent (porteurs de projet, CNPN, CSRPN, MTE etc.).\nPitchou (Espèces protégées) est portée par La Fabrique Numérique de l'Ecologie (MTE-MCT).",
		missions: [
			'Développement fullstack',
			'Devops, déploiement',
			'Compréhension des besoins utilisateurs'
		],
		stack: {
			front: ['DSFR', 'Svelte'],
			back: ['Fastify', 'Node.js', 'PostgreSQL'],
			tools: ['Docker', 'Knex', 'Matomo', 'Scalingo', 'Sentry']
		},
		siteUrl: 'https://beta.gouv.fr/startups/pitchou.html',
		githubUrl: 'https://github.com/betagouv/pitchou'
	},
	{
		title: 'Enseignante',
		company: 'IUT Informatique de Bayonne',
		startDate: '2025-09-10',
		endDate: '2025-10-17',
		contractType: 'Auto-entreprise',
		context:
			"Encadrement des TP du cours de Développement Web auprès d'élèves de deuxième année, autour des technologies suivantes : HTML, CSS, JavaScript, SQL et surtout PHP.\nProjet de fin de module : encadrement d'un projet complet en PHP, réalisé en binôme : création d'un site e-commerce de A à Z. Ce projet intègre la définition d'une problématique et d'une cible, la conception de la base de données et de la structure des pages, une réflexion sur les enjeux de sécurité (notamment liés au paiement en ligne), la mise en place d'un back-office et la gestion de projet de bout en bout.",
		missions: [
			'Introduction à PHP et transmission de bonnes pratiques de développement : séparation de la logique et de la présentation, et techniques de débogage',
			'Approche pédagogique centrée sur la sécurité et la fiabilité : validation des données, gestion des requêtes GET/POST, et sensibilisation à la cybersécurité',
			'Formation à des outils et concepts modernes du web : AJAX / Fetch API, interactions client-serveur, manipulation et persistance des données avec PDO (PHP Data Objects)',
			"Mise en place d'un environnement d'apprentissage professionnel avec méthodologies de debugging, gestion des fichiers et optimisation des ressources système"
		],
		stack: {
			front: ['CSS', 'HTML5'],
			back: ['PHP'],
			tools: ['SQL', 'XML']
		}
	},
	{
		title: "Intervention Collège Irandatz d'Hendaye",
		startDate: '2026-02-02',
		endDate: '2026-02-03',
		contractType: 'Auto-entreprise',
		context:
			"Intervention dans le cadre d'une Journée pour promouvoir les sciences chez les collégiennes/lycéennes d'Hendaye et de Saint-Jean-De-Luz, organisée par le collège Irandatz à Hendaye. Écriture de « fiches métier » après avoir interviewé des femmes du Pays-Basque et des Landes travaillant dans le numérique.",
		missions: [],
		stack: { front: [], back: [], tools: [] }
	},
	{
		title: 'Boulangerie TRANCHÉ',
		startDate: '2025-12-01',
		endDate: '2025-12-31',
		contractType: 'Auto-entreprise',
		context:
			'Chaîne de boulangerie artisanale et engagée : saisonnalité, anti-gaspi et gourmandise au quotidien. Paris 9, 17, 4 | Asnières-sur-Seine.',
		missions: ['Prestation de service pour mise à jour et maintenance du site WordPress.'],
		stack: { front: [], back: [], tools: ['Wordpress'] }
	}
];
