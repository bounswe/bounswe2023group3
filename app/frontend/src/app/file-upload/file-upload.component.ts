import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Output() shortLinkEmitter: EventEmitter<string> = new EventEmitter<string>();
  shortLink: string = "";
  file: File | null = null;

  base64String: string | null = null;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0];

    if (this.file) {
      this.convertFileToBase64(this.file);
    }
  }

  private convertFileToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      // The result will be the base64-encoded string
      this.base64String = reader.result as string;
      console.log(this.base64String);
    };

    reader.readAsDataURL(file);
  }

  onUpload() {
    if (this.file) {
      this.fileUploadService.upload(this.file).subscribe(
        (response: any) => {
          if (response) {
            this.shortLink = response.data.url;
            this.shortLinkEmitter.emit(this.shortLink);
          } else {
            console.error('Failed to get short link from the response.');
          }
        },
        (error) => {
          console.error('Error during file upload:', error);
        }
      );
    } else {
      console.error('No file selected for upload.');
    }
  }
}
