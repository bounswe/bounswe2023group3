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

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    if (this.file) {
      this.fileUploadService.upload(this.file).subscribe(
        (response: any) => {
          if (response && response.link) {
            this.shortLink = response.link;
            console.log(this.shortLink);
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
