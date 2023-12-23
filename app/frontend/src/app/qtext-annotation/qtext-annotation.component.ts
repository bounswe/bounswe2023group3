import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { NgxAnnotateTextComponent, Annotation } from 'ngx-annotate-text';

@Component({
  selector: 'app-qtext-annotation',
  templateUrl: './qtext-annotation.component.html',
  styleUrls: ['./qtext-annotation.component.css'],
})
export class QtextAnnotationComponent {
  @ViewChild('annotateText') ngxAnnotateText?: NgxAnnotateTextComponent;

  @Input() text!: string
  @Input() annotationInput!: any[]

  enterAnnotation: boolean = false

  annotations: Annotation[] = [];
  annotations_copy: Annotation[] = [];

  events: string[] = [];
  newAnotation!: string

  constructor(){
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
  
  showInput(){
    this.enterAnnotation=true
  }

  onMouseOverAnnotation(event: any) {
    const annotationElement = this.findAnnotationElement(event.target);
    if (annotationElement) {
      const annotationText = annotationElement.innerText;
      const matchingAnnotation = this.annotations_copy.find(annotation => annotation.label === annotationText);
  
      if (matchingAnnotation) {
        this.annotations.push(matchingAnnotation);
        this.events.push(`Mouse Over - Added '${matchingAnnotation}'`);
      }
    }
  }
  
  onMouseOutAnnotation(event: any) {
    const annotationElement = this.findAnnotationElement(event.target);
    if (annotationElement) {
      const annotationText = annotationElement.innerText;
      const matchingAnnotation = this.annotations_copy.find(annotation => annotation.label === annotationText);
  
      if (matchingAnnotation) {
        const index = this.annotations.findIndex(annotation => annotation === matchingAnnotation);
        if (index !== -1) {
          this.annotations.splice(index, 1);
          this.events.push(`Mouse Out - Removed '${matchingAnnotation}'`);
        }
      }
    }
  }
  
private findAnnotationElement(target: any): HTMLElement | null {
  while (target && !target.classList.contains('my-annotation')) {
    target = target.parentElement;
  }

  return target as HTMLElement;
}
  
  addAnnotation(label: string): void {
    if (!this.ngxAnnotateText) {
      return;
    }

    const selection = this.ngxAnnotateText.getCurrentTextSelection();
    if (!selection) {
      return;
    }

    const annotation = new Annotation(selection.startIndex, selection.endIndex, label, '#0d6efd');
    this.annotations = this.annotations.concat(annotation);
    this.events.push(`Added '${annotation}'`);
    this.enterAnnotation=false
  }

  onClickAnnotation(annotation: Annotation) {
    this.events.push(`Clicked on '${annotation}'`);
  }

  onRemoveAnnotation(annotation: Annotation): void {
    this.events.push(`Removed '${annotation}'`);
  }
}