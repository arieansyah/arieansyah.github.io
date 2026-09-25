export const profile = {
  name: 'Arieansyah',
  role: 'Senior Software Engineer',
  tagline: 'Backend, DevOps & mobile engineer',
  company: 'Roots (Akar Solusi Inovatif)',
  companyUrl: 'http://roots.co.id/',
  location: 'Pangkalan Bun, Kalimantan Tengah, Indonesia',
  email: 'arieansyahp.bun@gmail.com',
  phone: '+62 822-5031-4988',
  phoneHref: 'tel:+6282250314988',
  github: 'https://github.com/arieansyah',
  linkedin: 'https://www.linkedin.com/in/arieansyah/',
  bio: "I design and ship backend services, cloud infrastructure, and mobile products. Currently Senior Software Engineer at Roots, based in Pangkalan Bun, Kalimantan Tengah.",
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export const features = [
  {
    title: 'Backend & Microservices',
    description:
      'Go and Node.js microservices on Kubernetes, Laravel apps modernized with FrankenPHP and Octane, RESTful APIs built for scale and maintainability.',
    icon: 'server',
  },
  {
    title: 'DevOps & Cloud Infra',
    description:
      'CI/CD pipelines with GitHub Actions, Kubernetes deployments via Helm, infrastructure automation with Ansible, and performance testing with JMeter.',
    icon: 'cloud',
  },
  {
    title: 'Mobile & Conversational Products',
    description:
      'Cross-platform apps with Flutter, on-device ML with TensorFlow Lite, and production chatbots built on LivePerson for enterprise customer service.',
    icon: 'smartphone',
  },
] as const

export const clients = [
  'Roots',
  'Pertamina Gas Negara',
  'Pertamina Lubricants',
  'Garudafood',
  'Gasnet',
  'Taco',
  'AdaRemit',
  'Arya Duta Group',
  'BPK RI',
  'Neosoft',
  'Madhang',
]

export const experience = [
  {
    company: 'Roots — Akar Solusi Inovatif',
    badges: [
      { label: 'Senior Software Engineer, Aug 2021 – Present', current: true },
      { label: 'Software Engineer, Aug 2020 – Aug 2021', current: false },
    ],
    summary:
      'Akar Solusi Inovatif (Roots) provides IT services and partners with companies of all sizes to build bespoke, innovative products.',
    description:
      'Collaborated with the development team to analyze business requirements, design application architectures, estimate timelines, and implement solutions. Led backend and microservices development (Go/Node.js) on Kubernetes; enforced coding standards, conducted design reviews, and mentored engineers. Built a LivePerson chatbot, implemented performance testing with JMeter, and shipped CI/CD pipelines via GitHub Actions with Helm on Kubernetes. Developed multi-platform apps with Flutter. Modernized Laravel deployments with FrankenPHP (Caddy) and Ansible, and adopted Laravel Octane.',
  },
  {
    company: 'Software Engineer, Neosoft',
    badges: [{ label: 'May 2019 – August 2020', current: false }],
    summary: 'Point-of-sale and management system for aesthetic clinics.',
    description:
      'Designed and developed a web POS application using Laravel, presented and trained clients, and built a RESTful API for mobile apps. Supported sales at Cosmobeauté Indonesia 2019.',
  },
  {
    company: 'Backend Developer, Madhang',
    badges: [{ label: 'January – April 2019', current: false }],
    summary: 'Home-cooked food ordering service.',
    description:
      'Maintained the Madhang backend using Node.js (Express). Tech stack: JavaScript (ES6), automated testing, Docker, NoSQL (Cassandra).',
  },
]

export const projects = [
  {
    name: 'Girex POS',
    description:
      'Independent POS with Flutter (mobile) and Laravel (backend); Firebase remote config and Crashlytics; FrankenPHP, Ansible, and Laravel Octane.',
  },
  {
    name: 'Pertamina Gas Negara',
    description:
      'LivePerson chatbot for customer service; Go middleware for image handling; microservices and web apps; report generation, data retention, Redis/Bull queues; JMeter; CI/CD and Helm on Kubernetes.',
  },
  {
    name: 'Pertamina Lubricants',
    description: 'API for OTP using LivePerson.',
  },
  {
    name: 'Garudafood & Gasnet',
    description: 'Chatbot built on LivePerson.',
  },
  {
    name: 'Taco',
    description: 'CMS with Laravel, API with Golang, chatbot with Kata.ai.',
    url: 'https://taco.co.id/',
  },
  {
    name: 'AdaRemit',
    description:
      'Remittance web (Vue.js, Slim) and iOS/Android (React Native, Lumen); AWS with load balancer and VPC.',
    url: 'https://adaremit.co.id/',
  },
  {
    name: 'Arya Duta Group',
    description: 'Hotel networking login with MikroTik and RADIUS; website content. PHP/Laravel, MySQL.',
  },
  {
    name: 'PT. Altrovis Tekno Global',
    description: 'Sisdiklat app for BPK RI using Laravel and SQL Server Azure.',
  },
  {
    name: 'PT. Wiratek Asia Solusi',
    description: 'Hospital Information System (SIMRS) with PHP native and Oracle.',
  },
  {
    name: 'Dicoding',
    description:
      'Flutter app to classify food photos with TensorFlow Lite (google/aiy v1) and show nutrition, ingredients, and cooking steps via Google Gemini API.',
  },
]

export const expertise = [
  'Express JS',
  'PHP Laravel',
  'Golang',
  'DevOps',
  'Flutter',
  'MySQL',
  'PostgreSQL',
  'NoSQL (Cassandra)',
]

export const education = {
  school: 'Dian Nuswantoro University',
  degree: 'Bachelor of Technology, Informatics Engineering, 2014 – 2018 · GPA 3.21',
  thesis:
    'Thesis: Implementasi Algoritma Levenshtein Distance Sebagai Chatbot Agen Pariwisata Berbasis Aplikasi LINE (SEMNASTIK) 2019.',
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
