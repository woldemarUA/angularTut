import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  generateFileName(originalFileName: string): string {
    const uniqueFileName = `${originalFileName}-${new Date().getTime()}-${Math.random()
      .toString(16)
      .substring(2, 8)}`;
    return uniqueFileName;
  }

  canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(
            new Error("Photo n'etait pas preparé; Essayez vous envore une fois")
          );
        }
      }, 'image/png');
    });
  }
}
