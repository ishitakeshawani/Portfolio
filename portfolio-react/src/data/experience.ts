export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  techStack: string[];
};

export const experience: Experience[] = [
  {
    company: 'ServiceNow',
    role: 'Software Engineer II',
    period: 'Aug 2025 – Present',
    summary:
      "Building AI-powered features for Hardware Asset Management. Shipped an asset summary generator that aggregates hardware details through multiple autonomous agents, and built the HAM AI Operations Specialist using ServiceNow's agentic framework, Flow Designer flows, and script includes. Also developed an automated LLM comparison testing framework across OpenAI, Azure, Vertex, and Bedrock.",
    techStack: ['JavaScript', 'Java', 'ServiceNow Platform'],
  },
  {
    company: 'Housing.com',
    role: 'Software Development Engineer',
    period: 'Dec 2024 – Aug 2025',
    summary:
      'Revamped the New Project page with 20+ reusable, pixel-perfect React components, and rebuilt the gallery view across mobile and desktop using React and GraphQL with a single-image carousel for better UX and performance.',
    techStack: ['JavaScript', 'React', 'Redux', 'GraphQL', 'Linaria'],
  },
  {
    company: 'Turvo India',
    role: 'Software Engineer',
    period: 'Jun 2022 – Nov 2024',
    summary:
      'Shipped 40+ features and resolved 1000+ customer tickets monthly. Built Okta auth, tenant impersonation/creation with RBAC, announcement management for 180+ enterprise tenants, and APIs for monitoring tenant API usage limits.',
    techStack: [
      'React',
      'JavaScript',
      'Java',
      'Spring Boot',
      'MongoDB',
      'MySQL',
      'Python',
      'Elasticsearch',
    ],
  },
];
