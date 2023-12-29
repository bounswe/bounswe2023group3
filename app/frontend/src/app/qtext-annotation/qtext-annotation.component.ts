import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { NgxAnnotateTextComponent, Annotation } from 'ngx-annotate-text';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-qtext-annotation',
  templateUrl: './qtext-annotation.component.html',
  styleUrls: ['./qtext-annotation.component.css'],
})
export class QtextAnnotationComponent {
  @ViewChild('annotateText') ngxAnnotateText?: NgxAnnotateTextComponent;

  @ViewChild('textContainer') textContainer?: ElementRef;

  @Input() text!: string
  @Input() pollId!: string
  @Input() annotationInput!: any[]

  enterAnnotation: boolean = false

  annotations: Annotation[] = [];
  annotations_copy: Annotation[] = [];

  events: string[] = [];
  newAnotation!: string

  hoveredAnnotation!: any

  apiUrl = environment.apiBaseUrl;
  annotationUrl = environment.annotationUrl;

  constructor(
    private http: HttpClient,
  ){
  }

  ngOnInit(){
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['annotationInput'] && changes['annotationInput'].currentValue) {
      console.log(changes['annotationInput'])
    this.annotationInput.forEach((annotation) => {
      const start = annotation.target.selector.start;
      const end = annotation.target.selector.end;

      const new_annotation = new Annotation(start, end, annotation.body.value, '#0d6efd');
      this.annotations = this.annotations.concat(new_annotation);

      this.annotations_copy = this.annotations

      this.events.push(`Added '${new_annotation}'`);

    });
    }
  }
  
  onMouseEnter(event: MouseEvent): void {
    const index = this.getIndexFromMousePosition(event);
    this.hoveredAnnotation = this.findAnnotationByIndex(index);
  }

  getIndexFromMousePosition(event: MouseEvent): number {
    if (this.textContainer) {
      const rect = this.textContainer.nativeElement.getBoundingClientRect();
      // Adjust for padding
      const paddingLeft = parseFloat(window.getComputedStyle(this.textContainer.nativeElement).paddingLeft);
      const fontSize = parseFloat(window.getComputedStyle(this.textContainer.nativeElement).fontSize);
      const mouseX = event.clientX - rect.left - paddingLeft;
      const charWidth = rect.width / this.text.length;
      const spacing = charWidth - fontSize; // Adjust for spacing between characters
      // Ensure index is within bounds
      const index = Math.max(0, Math.min(this.text.length - 1, Math.floor((mouseX - spacing / 2) / charWidth)));

  
      return index;
    }
  
    return -1; 
  }
  

  findAnnotationByIndex(index: number): Annotation | undefined {
      return this.annotations.find(annotation => annotation.startIndex <= index && annotation.endIndex >= index);
  }

  showInput(){
    this.enterAnnotation=true
  }

  closeInput(){
    this.enterAnnotation=false
  }
  
  addAnnotation(label: string): void {
    if (!this.ngxAnnotateText) {
      return;
    }

    const selection = this.ngxAnnotateText.getCurrentTextSelection();
    if (!selection) {
      return;
    }

    this.http.post(this.annotationUrl + '/annotation',
    {"body": {
      "type": "TextualBody",
      "value": this.newAnotation,
      "format": "text/plain"
    },
    "target": {
      "source": this.apiUrl + this.pollId,
      "selector": {
        "end": selection.endIndex,
        "type": "TextPositionSelector",
        "start":  selection.startIndex
      }},
      "creator": localStorage.getItem('user_id')
    }).subscribe(
      (response: any) => {
      },
      (error) => {
        console.error('Error creating annotation:', error);
      }
    );

    const annotation = new Annotation(selection.startIndex, selection.endIndex, label, '#0d6efd');
    this.annotations = this.annotations.concat(annotation);
    this.events.push(`Added '${annotation}'`);
    this.enterAnnotation=false
  }

  onClickAnnotation(annotation: Annotation) {
    this.events.push(`Clicked on '${annotation}'`);
  }
}