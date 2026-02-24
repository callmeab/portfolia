import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ScrollyCanvasComponent } from './components/scrolly-canvas/scrolly-canvas.component';
import { ProjectsGridComponent } from './components/projects-grid/projects-grid.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, ScrollyCanvasComponent, ProjectsGridComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
