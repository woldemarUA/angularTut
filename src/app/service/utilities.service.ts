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
}
