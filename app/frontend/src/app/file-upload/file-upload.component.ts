import { Component, EventEmitter, OnInit ,Output} from '@angular/core'; 
import { FileUploadService } from '../file-upload.service'; 

@Component({ 
	selector: 'app-file-upload', 
	templateUrl: './file-upload.component.html', 
	styleUrls: ['./file-upload.component.css'] 
}) 
export class FileUploadComponent implements OnInit { 
	@Output() shortLinkEmitter: EventEmitter<string> = new EventEmitter<string>();
	shortLink: string = ""; //get the file
	file: File| null  = null; 

	constructor(private fileUploadService: FileUploadService) { } 

	ngOnInit(): void { 
	} 

	onChange(event: any) { 
		this.file = event.target.files[0]; 
	} 

	onUpload() { 
		this.fileUploadService.upload(this.file).subscribe( 
			(event: any) => { 
				if (typeof (event) === 'object') { 
					this.shortLink = event.link; 
					console.log(this.shortLink)
					this.shortLinkEmitter.emit(this.shortLink); 
				} 
			} 
		); 
	} 

} 
