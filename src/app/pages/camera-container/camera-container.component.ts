import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-camera-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera-container.component.html',
  styleUrls: ['./camera-container.component.css'],
})
export class CameraContainerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video') videoElement: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasElement: ElementRef<HTMLCanvasElement>;
  isCanvas: boolean = false;
  mediaStream: MediaStream | null = null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleCanvas() {
    this.isCanvas = !this.isCanvas;
    this.capture();
  }
  capture() {
    if (isPlatformBrowser(this.platformId) && this.isCanvas) {
      const videoElement = this.videoElement.nativeElement;
      const canvasElement = this.canvasElement.nativeElement;
      const context = canvasElement.getContext('2d');

      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      context.drawImage(
        videoElement,
        0,
        0,
        videoElement.videoWidth,
        videoElement.videoHeight
      );
    }
  }

  stopCamera() {
    if (this.mediaStream)
      this.mediaStream.getTracks().forEach((track) => track.stop());
  }
  async startCamera() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        this.videoElement.nativeElement.srcObject = this.mediaStream;
      } catch (err) {
        console.error(err);
      }
    }
  }
  ngAfterViewInit() {
    this.startCamera();
  }

  ngOnDestroy() {
    this.stopCamera();
  }
}
