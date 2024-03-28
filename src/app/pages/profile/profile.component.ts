import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { StorageService } from '../../service/storage.service';
import { UtilitiesService } from '../../service/utilities.service';
import { ToastService } from '../../service/toast.service';

import { ToastContainerComponent } from '../toast-container/toast-container.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FileUploadComponent, FormsModule, ToastContainerComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileUpload') fileUploadComponent: FileUploadComponent;
  @ViewChild('displayName') displayNameInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;
  isDisplayName: boolean = false;
  isPassword: boolean = false;
  displayName: string = null;
  email: string = null;
  phoneNumber: string = null;
  photoUrl: string = null;
  oldPassword: string = null;
  newPassword: string = null;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private utilities: UtilitiesService,
    private toastService: ToastService
  ) {}
  triggerFileInputClick() {
    this.fileUploadComponent.openFileDialog();
  }
  triggerDisplayNameInput() {
    this.isDisplayName = !this.isDisplayName;
  }

  async saveDisplayName() {
    try {
      const result = await this.authService.updateUserProfile({
        displayName: this.displayName,
      });
      this.authService.refreshUserData();
      this.toastService.showSuccess(
        `Nom d'affichage mis à jour comme suit : ${this.displayName}`
      );
      this.triggerDisplayNameInput();
    } catch (err) {
      this.toastService.showFailrue("Nom d'utilisateur n'etait pas changé");
    }
  }

  async updateProfilePhoto(file: File) {
    const fileName: string = this.utilities.generateFileName('user-pic');
    const link = await this.storageService.uploadFile(file, fileName);
    const result = await this.authService.updateUserProfile({ photoURL: link });
  }

  async updatePassword() {
    try {
      const response = await this.authService.updateUserPassword(
        this.oldPassword,
        this.newPassword
      );

      this.toastService.showSuccess('Mot de pass etait changé avec success');
      this.isPassword = !this.isPassword;
    } catch (err) {
      console.error(err.code);
      if (err.code === 'auth/invalid-credential')
        return this.toastService.showFailrue('Ancien mot de passe erroné');
      this.toastService.showFailrue("Mot de pass n'etait pas changé");
    }
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        const { displayName, email, phoneNumber, photoURL } = user;
        this.displayName = displayName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.photoUrl = photoURL;
      }
    });
  }
}
