import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  @Output() fileUploaded = new EventEmitter<File>();
  @ViewChild('fileInput') fileInput: ElementRef;

  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = null;
    if (element.files && element.files.length) {
      file = element.files[0];
      this.fileUploaded.emit(file);
    }

    return file;
  }
  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }
}
