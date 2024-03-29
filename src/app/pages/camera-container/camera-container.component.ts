import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  OnDestroy,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

import { UtilitiesService } from '../../service/utilities.service';
import { resolve } from 'path';

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

  @Output() fileCaptured: EventEmitter<File> = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adjustCanvasSize();
  }
  photoLink: string | null = null;
  isCanvas: boolean = false;
  isUpload: boolean = false;
  mediaStream: MediaStream | null = null;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private utilitiesService: UtilitiesService
  ) {}

  adjustCanvasSize() {
    if (this.isCanvas) {
      const videoElement = this.videoElement.nativeElement;
      const canvasElement = this.canvasElement.nativeElement;

      canvasElement.width = videoElement.clientWidth;
      canvasElement.height = videoElement.clientHeight;
    }
  }

  toggleCanvas() {
    this.isCanvas = !this.isCanvas;
    this.capture();
  }
  capture() {
    if (isPlatformBrowser(this.platformId) && this.isCanvas) {
      const videoElement = this.videoElement.nativeElement;
      const canvasElement = this.canvasElement.nativeElement;
      const context = canvasElement.getContext('2d');
      const containerWidth = videoElement.clientWidth; // Width of the container
      const scale = containerWidth / videoElement.videoWidth; // Scale factor

      // Set canvas size based on the container size while maintaining aspect ratio
      canvasElement.width = videoElement.videoWidth * scale;
      canvasElement.height = videoElement.videoHeight * scale;

      context.drawImage(
        videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      this.isUpload = !this.isUpload;
    }
  }

  async savePhoto() {
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    const blob = await this.utilitiesService.canvasToBlob(canvas);
    const file = new File([blob], 'capturedImage.png', { type: 'image/png' });

    this.fileCaptured.emit(file);
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
