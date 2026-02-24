import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const TOTAL_FRAMES = 120;
const FRAME_PATH = (i: number) => `sequence/frames/frame_${String(i).padStart(3, '0')}.webp`;

interface TextPhase {
  text: string;
  sub: string;
  align: 'center' | 'left' | 'right';
  startPct: number;
  peakPct: number;
  endPct: number;
}

@Component({
  selector: 'app-scrolly-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrolly-canvas.component.html',
  styleUrl: './scrolly-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollyCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasEl') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('stickyWrap') stickyRef!: ElementRef<HTMLDivElement>;

  private ctx!: CanvasRenderingContext2D;
  private frames: HTMLImageElement[] = [];
  private currentFrame = 0;
  private rafId = 0;
  private loadedCount = 0;

  scrollProgress = 0; // 0–1

  readonly phases: TextPhase[] = [
    {
      text: 'Abdullah.',
      sub: 'Creative Developer',
      align: 'center',
      startPct: 0,
      peakPct: 0.1,
      endPct: 0.28,
    },
    {
      text: 'I build digital',
      sub: 'experiences.',
      align: 'left',
      startPct: 0.27,
      peakPct: 0.38,
      endPct: 0.57,
    },
    {
      text: 'Bridging design',
      sub: 'and engineering.',
      align: 'right',
      startPct: 0.56,
      peakPct: 0.67,
      endPct: 0.88,
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.preloadFrames();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
    this.drawFrame(this.currentFrame);
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private preloadFrames(): void {
    this.frames = new Array(TOTAL_FRAMES);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        this.loadedCount++;
        if (this.loadedCount === 1) {
          // draw first frame immediately
          this.frames[i] = img;
          this.drawFrame(0);
        } else {
          this.frames[i] = img;
        }
      };
      img.onerror = () => {
        this.loadedCount++;
      };
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.update());
  }

  private update(): void {
    const container = this.canvasRef.nativeElement.closest('.scroll-container') as HTMLElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableHeight = container.scrollHeight - window.innerHeight;
    const scrolled = -rect.top;
    this.scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(this.scrollProgress * TOTAL_FRAMES));

    if (frameIndex !== this.currentFrame) {
      this.currentFrame = frameIndex;
      this.drawFrame(frameIndex);
    }

    this.cdr.markForCheck();
  }

  private drawFrame(index: number): void {
    const img = this.frames[index];
    if (!img || !this.ctx) return;

    const canvas = this.canvasRef.nativeElement;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    // object-fit: cover
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    this.ctx.clearRect(0, 0, cw, ch);
    this.ctx.drawImage(img, dx, dy, dw, dh);
  }

  /** Compute opacity & translateX for each text phase */
  getPhaseStyle(phase: TextPhase): { [key: string]: string } {
    const p = this.scrollProgress;
    const { startPct, peakPct, endPct, align } = phase;

    // Fade in: startPct → peakPct, fade out: peakPct → endPct
    let opacity = 0;
    let tx = 0;

    if (p >= startPct && p <= endPct) {
      if (p < peakPct) {
        const t = (p - startPct) / (peakPct - startPct);
        opacity = t;
        // Slide in from side
        tx = align === 'left' ? (1 - t) * 60 : align === 'right' ? -(1 - t) * 60 : 0;
      } else {
        const t = (p - peakPct) / (endPct - peakPct);
        opacity = 1 - t;
        // Slide out
        tx = align === 'left' ? -t * 40 : align === 'right' ? t * 40 : 0;
      }
    }

    return {
      opacity: `${opacity}`,
      transform: `translateX(${tx}px)`,
      'text-align': align,
    };
  }

  isPhaseVisible(phase: TextPhase): boolean {
    const p = this.scrollProgress;
    return p >= phase.startPct && p <= phase.endPct;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }
}
