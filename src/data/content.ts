export const profile = {
  name: 'Arieansyah',
  role: 'Senior Software Engineer',
  tagline: 'Backend, DevOps & mobile engineer',
  company: 'Roots',
  companyUrl: 'http://roots.co.id/',
  location: 'Pangkalan Bun, Kalimantan Tengah, Indonesia',
  shortLocation: 'Pangkalan Bun, Indonesia',
  timezone: 'Asia/Jakarta',
  timezoneLabel: 'WIB (UTC+7)',
  email: 'arieansyahp.bun@gmail.com',
  phone: '+62 822-5031-4988',
  phoneHref: 'tel:+6282250314988',
  github: 'https://github.com/arieansyah',
  linkedin: 'https://www.linkedin.com/in/arieansyah/',
  /** Also the source for `npm run sync:medium` (scripts/sync-medium.mjs). */
  medium: 'https://medium.com/@arieansyah',
  /** First professional role — drives the "years of experience" figure. */
  careerStart: '2019-01',
  availability: 'Open to new opportunities',
  bio: 'I design and ship backend services, cloud infrastructure, and mobile products — from Go and Node.js microservices on Kubernetes to Laravel platforms, CI/CD pipelines, and Flutter apps.',
  summary:
    'Senior Software Engineer with a track record across backend, DevOps, and mobile. Leads Go/Node.js microservices on Kubernetes, ships CI/CD with GitHub Actions and Helm, modernizes Laravel deployments, and builds Flutter apps and enterprise chatbots for clients such as Pertamina Gas Negara, Garudafood, and BPK RI.',
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const features = [
  {
    title: 'Backend & Microservices',
    description:
      'Go and Node.js microservices on Kubernetes, Laravel apps modernized with FrankenPHP and Octane, and RESTful APIs built for scale and maintainability.',
    icon: 'server',
  },
  {
    title: 'DevOps & Cloud Infra',
    description:
      'CI/CD pipelines with GitHub Actions, Kubernetes deployments via Helm, infrastructure automation with Ansible, and performance testing with JMeter.',
    icon: 'cloud',
  },
  {
    title: 'Mobile & Conversational',
    description:
      'Cross-platform apps with Flutter, on-device ML with TensorFlow Lite, and production chatbots built on LivePerson for enterprise customer service.',
    icon: 'smartphone',
  },
] as const

export const clients = [
  'Pertamina Gas Negara',
  'Pertamina Lubricants',
  'Garudafood',
  'BPK RI',
  'Gasnet',
  'Taco',
  'AdaRemit',
  'Arya Duta Group',
  'Roots',
  'Neosoft',
  'Madhang',
]

export type Role = {
  title: string
  /** YYYY-MM */
  start: string
  /** YYYY-MM, or null while current */
  end: string | null
}

export const experience: {
  company: string
  url?: string
  roles: Role[]
  summary: string
  highlights: string[]
  stack: string[]
}[] = [
  {
    company: 'Roots — Akar Solusi Inovatif',
    url: 'http://roots.co.id/',
    roles: [
      { title: 'Senior Software Engineer', start: '2021-08', end: null },
      { title: 'Software Engineer', start: '2020-08', end: '2021-08' },
    ],
    summary: 'IT services partner building bespoke, innovative products for companies of all sizes.',
    highlights: [
      'Lead backend and microservices development in Go and Node.js on Kubernetes.',
      'Enforce coding standards, run design reviews, and mentor engineers on the team.',
      'Ship CI/CD pipelines with GitHub Actions and Helm deployments to Kubernetes.',
      'Built LivePerson chatbots for enterprise customer service and set up performance testing with JMeter.',
      'Modernized Laravel deployments with FrankenPHP (Caddy), Ansible, and Laravel Octane.',
      'Develop multi-platform apps with Flutter; analyze requirements, design architectures, and estimate timelines with the team.',
    ],
    stack: ['Go', 'Node.js', 'Kubernetes', 'Helm', 'GitHub Actions', 'Laravel', 'FrankenPHP', 'Ansible', 'Flutter', 'LivePerson', 'JMeter'],
  },
  {
    company: 'Neosoft',
    roles: [{ title: 'Software Engineer', start: '2019-05', end: '2020-08' }],
    summary: 'Point-of-sale and management system for aesthetic clinics.',
    highlights: [
      'Designed and developed a web POS application with Laravel.',
      'Built the RESTful API powering the companion mobile apps.',
      'Presented and trained clients, and supported sales at Cosmobeauté Indonesia 2019.',
    ],
    stack: ['PHP', 'Laravel', 'REST API'],
  },
  {
    company: 'Madhang',
    roles: [{ title: 'Backend Developer', start: '2019-01', end: '2019-04' }],
    summary: 'Home-cooked food ordering service.',
    highlights: [
      'Maintained the Node.js (Express) backend.',
      'Worked with automated testing, Docker, and Cassandra (NoSQL).',
    ],
    stack: ['JavaScript', 'Express', 'Docker', 'Cassandra'],
  },
]

export const projectCategories = ['Backend', 'DevOps', 'Mobile', 'Web', 'Chatbot & AI'] as const
export type ProjectCategory = (typeof projectCategories)[number]

export const projects: {
  name: string
  context: string
  description: string
  categories: ProjectCategory[]
  stack: string[]
  url?: string
  featured?: boolean
}[] = [
  {
    name: 'Pertamina Gas Negara',
    context: 'Enterprise · Energy',
    description:
      'LivePerson chatbot for customer service, Go middleware for image handling, microservices and web apps with report generation, data retention, and Redis/Bull queues — load-tested with JMeter and deployed via CI/CD and Helm on Kubernetes.',
    categories: ['Backend', 'DevOps', 'Chatbot & AI'],
    stack: ['Go', 'LivePerson', 'Redis', 'Bull', 'Kubernetes', 'Helm', 'JMeter'],
    featured: true,
  },
  {
    name: 'Girex POS',
    context: 'Independent product',
    description:
      'Point-of-sale system with a Flutter mobile app and Laravel backend, Firebase Remote Config and Crashlytics, served with FrankenPHP and Laravel Octane and provisioned with Ansible.',
    categories: ['Mobile', 'Backend', 'DevOps'],
    stack: ['Flutter', 'Laravel', 'Firebase', 'FrankenPHP', 'Octane', 'Ansible'],
    featured: true,
  },
  {
    name: 'AdaRemit',
    context: 'Fintech · Remittance',
    description:
      'Remittance web app (Vue.js, Slim) and iOS/Android apps (React Native, Lumen), running on AWS behind a load balancer inside a VPC.',
    categories: ['Web', 'Mobile', 'Backend', 'DevOps'],
    stack: ['Vue.js', 'Slim', 'React Native', 'Lumen', 'AWS'],
    url: 'https://adaremit.co.id/',
    featured: true,
  },
  {
    name: 'Food Recognition App',
    context: 'Dicoding · Machine learning',
    description:
      'Flutter app that classifies food photos on-device with TensorFlow Lite (google/aiy v1), then shows nutrition, ingredients, and cooking steps via the Google Gemini API.',
    categories: ['Mobile', 'Chatbot & AI'],
    stack: ['Flutter', 'TensorFlow Lite', 'Gemini API'],
    featured: true,
  },
  {
    name: 'Taco',
    context: 'Client project',
    description: 'CMS built with Laravel, API in Go, and a customer chatbot on Kata.ai.',
    categories: ['Web', 'Backend', 'Chatbot & AI'],
    stack: ['Laravel', 'Go', 'Kata.ai'],
    url: 'https://taco.co.id/',
  },
  {
    name: 'Pertamina Lubricants',
    context: 'Enterprise · Energy',
    description: 'OTP API integrated with LivePerson conversational flows.',
    categories: ['Backend', 'Chatbot & AI'],
    stack: ['LivePerson', 'REST API'],
  },
  {
    name: 'Garudafood & Gasnet',
    context: 'Enterprise',
    description: 'Customer service chatbots built on LivePerson.',
    categories: ['Chatbot & AI'],
    stack: ['LivePerson'],
  },
  {
    name: 'Sisdiklat BPK RI',
    context: 'Government · via PT. Altrovis Tekno Global',
    description: 'Training and education system for the Audit Board of Indonesia, built with Laravel on Azure SQL Server.',
    categories: ['Web', 'Backend'],
    stack: ['Laravel', 'SQL Server', 'Azure'],
  },
  {
    name: 'Arya Duta Group',
    context: 'Hospitality',
    description: 'Hotel network login with MikroTik and RADIUS, plus website content management.',
    categories: ['Web', 'DevOps'],
    stack: ['PHP', 'Laravel', 'MySQL', 'MikroTik', 'RADIUS'],
  },
  {
    name: 'SIMRS',
    context: 'Healthcare · via PT. Wiratek Asia Solusi',
    description: 'Hospital Information System built with native PHP and Oracle.',
    categories: ['Web', 'Backend'],
    stack: ['PHP', 'Oracle'],
  },
]

export const skills: { group: string; icon: string; items: string[] }[] = [
  { group: 'Languages', icon: 'code', items: ['Go', 'JavaScript (ES6)', 'PHP', 'Dart'] },
  {
    group: 'Backend',
    icon: 'server',
    items: ['Node.js / Express', 'Laravel & Octane', 'Lumen', 'Slim', 'REST APIs', 'Redis / Bull queues'],
  },
  {
    group: 'DevOps & Cloud',
    icon: 'cloud',
    items: ['Kubernetes', 'Helm', 'Docker', 'GitHub Actions', 'Ansible', 'AWS', 'FrankenPHP / Caddy', 'JMeter'],
  },
  {
    group: 'Mobile & Frontend',
    icon: 'smartphone',
    items: ['Flutter', 'React Native', 'Vue.js', 'Firebase', 'TensorFlow Lite'],
  },
  {
    group: 'Databases',
    icon: 'database',
    items: ['MySQL', 'PostgreSQL', 'Cassandra', 'Redis', 'Oracle', 'SQL Server'],
  },
  { group: 'Conversational AI', icon: 'bot', items: ['LivePerson', 'Kata.ai', 'Google Gemini API'] },
]

export const education = {
  school: 'Dian Nuswantoro University',
  degree: 'Bachelor of Technology, Informatics Engineering',
  period: '2014 – 2018',
  gpa: '3.21',
  thesis:
    'Implementasi Algoritma Levenshtein Distance Sebagai Chatbot Agen Pariwisata Berbasis Aplikasi LINE (SEMNASTIK 2019).',
}

export const certifications = [
  { name: 'Belajar Pengembangan Aplikasi Flutter Intermediate', year: '2026' },
  { name: 'Belajar Penerapan Machine Learning untuk Flutter', year: '2026' },
  { name: 'Belajar Fundamental Aplikasi Flutter', year: '2026' },
  { name: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)', year: '2024' },
  { name: 'Belajar Dasar-Dasar DevOps', year: '2024' },
  { name: 'Belajar Dasar AI', year: '2024' },
  { name: 'Memulai Pemrograman Dengan Python', year: '2020' },
  { name: 'Belajar Prinsip Pemrograman SOLID', year: '2020' },
  { name: 'Oracle Database: SQL Fundamental', year: '2016' },
  { name: 'Linux Fundamental', year: '2016' },
  { name: 'Belajar Dasar Pemrograman Web', year: '' },
]
