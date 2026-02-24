import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accentColor: string;
  year: string;
}

@Component({
  selector: 'app-projects-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-grid.component.html',
  styleUrl: './projects-grid.component.scss',
})
export class ProjectsGridComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'Luminate — Brand OS',
      category: 'Brand Identity · Web',
      description:
        'End-to-end brand identity and interactive web platform for a Series-A fintech startup. Motion-first design system with 40+ reusable tokens.',
      tags: ['Angular', 'GSAP', 'Figma', 'Node.js'],
      accentColor: '#a78bfa',
      year: '2024',
    },
    {
      id: 2,
      title: 'Orbis — Data Visualizer',
      category: '3D · WebGL · Data',
      description:
        'Real-time 3D globe for visualising financial data streams. Built on Three.js with a custom WebSocket layer and sub-16ms render budget.',
      tags: ['Three.js', 'WebSocket', 'TypeScript', 'D3'],
      accentColor: '#38bdf8',
      year: '2024',
    },
    {
      id: 3,
      title: 'Onyx — E-Commerce',
      category: 'Full-Stack · UX',
      description:
        'Luxury e-commerce experience with AI-powered style recommendations, sub-second LCP and a checkout conversion uplift of 22%.',
      tags: ['Next.js', 'Prisma', 'OpenAI', 'Stripe'],
      accentColor: '#34d399',
      year: '2023',
    },
    {
      id: 4,
      title: 'Prism — Design System',
      category: 'Design Engineering',
      description:
        'Comprehensive design system for a 120-person product org. Atomic architecture, auto-generated Storybook docs, and zero-runtime tokens.',
      tags: ['React', 'Storybook', 'Style Dictionary', 'Figma'],
      accentColor: '#fb923c',
      year: '2023',
    },
  ];
}
