import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private database: Database,
    private storage: Storage,
    private authService: AuthService
  ) {}

  async uploadFile(file: File, fileName: string): Promise<string> {
    // this approach to use this function as file upload serivce with userprofile flag it is true we update userprofile
    const storageRef = ref(this.storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      const snapshot = await uploadTask;
      const downloadUrl = await getDownloadURL(snapshot.ref);

      return downloadUrl;
    } catch (err) {
      console.error(`Upload failed: ${err}`);
      throw err; // Rethrow to allow caller to handle the error
    }
  }
}
