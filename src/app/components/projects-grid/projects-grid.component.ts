import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  role: string;
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
      title: 'SmartApp 360',
      role: 'Angular Developer',
      category: 'Web · Business Management',
      description:
        'Web-based business management solution with POS, Inventory, and Accounts modules. Features automated purchase orders, payroll management, dynamic reporting, and rapid invoicing for retail operations.',
      tags: ['Angular', 'Tailwind CSS', 'Material UI', 'jQuery', 'Bootstrap'],
      accentColor: '#a78bfa',
      year: '2024',
    },
    {
      id: 2,
      title: 'CleryEdge',
      role: 'Angular Developer',
      category: 'Web · Enterprise Platform',
      description:
        'Complete revamp of the original CleryEdge project from ASPX pages to ASP.NET Core MVC Web API. Redesigned front-end using Angular and DevExpress for improved performance, scalability, and UX.',
      tags: ['Angular', 'DevExpress', 'ASP.NET Core', 'MVC'],
      accentColor: '#38bdf8',
      year: '2024',
    },
    {
      id: 3,
      title: 'Discover Sair',
      role: 'Angular / Ionic Developer',
      category: 'Web · Mobile · Admin Panel',
      description:
        'Comprehensive travel booking platform built on the MEAN Stack. Supports multi-role workflows for travelers, admins, and managers with trip exploration, booking management, and approval flows.',
      tags: ['Angular', 'Ionic', 'Node.js', 'Express.js', 'MongoDB'],
      accentColor: '#34d399',
      year: '2024',
    },
    {
      id: 4,
      title: 'PropUI',
      role: 'Angular Developer',
      category: 'Web · Migration Project',
      description:
        'Upgraded a full-featured Gym Management System to Angular 19. Modules for member registration, attendance, subscription management, and admin dashboards using Angular 16+ best practices.',
      tags: ['Angular 19', 'TypeScript', 'RxJS', 'Angular Material'],
      accentColor: '#fb923c',
      year: '2024',
    },
    {
      id: 5,
      title: 'DroneLeaf',
      role: 'Angular Developer',
      category: 'Web · Drone Management',
      description:
        'Innovative drone management and service portal with GraphQL API integration. Dual-login system for Personal and Organization users, dynamic dashboards, and real-time updates.',
      tags: ['Angular', 'GraphQL', 'TypeScript', 'RxJS'],
      accentColor: '#f472b6',
      year: '2023',
    },
    {
      id: 6,
      title: 'NIC Skin Care',
      role: 'Ionic-Angular Developer',
      category: 'Mobile · AI · Skincare',
      description:
        "Hybrid mobile app that scans men's facial images and delivers personalized skincare routines using AI. Integrates OpenAI API, Firebase Auth, and Firestore for secure, data-driven recommendations.",
      tags: ['Ionic', 'Angular', 'OpenAI API', 'Firebase'],
      accentColor: '#4ade80',
      year: '2023',
    },
    {
      id: 7,
      title: 'SignLingo Kids',
      role: 'Ionic-Angular Developer',
      category: 'Mobile · Education · Accessibility',
      description:
        'ASL-inspired learning app for kids featuring 3D animated models to demonstrate sign language gestures. Child-friendly UI/UX with modular architecture for smooth cross-platform performance.',
      tags: ['Ionic', 'Angular', '3D Animation', 'TypeScript'],
      accentColor: '#facc15',
      year: '2023',
    },
  ];
}
