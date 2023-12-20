import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { Annotation } from 'ngx-annotate-text';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-qtext-annotation',
  templateUrl: './qtext-annotation.component.html',
  styleUrls: ['./qtext-annotation.component.css']
})
export class QtextAnnotationComponent {
  @Input() question!: string
  @Input() pollId!: string

  @ViewChild('tooltip') tooltip: NgbTooltip | undefined;


  Annotations: Annotation[] = [];

  annotations: any[] = [];

  events: string[] = [];


  constructor(
    private http: HttpClient,
  ) {}

  onClickPollQuestion(annotation: Annotation) {
    this.events.push(`Selected word: '${annotation.label}'`);
    if (this.tooltip) {
      this.tooltip.content=annotation.label
      this.tooltip.open();
    }
  }


  ngOnInit(){
    this.http.get('http://34.105.66.254:1938/annotation?pollId=http%3A%2F%2F34.105.66.254%3A1923%2F'+this.pollId).subscribe(
      (response: any) => {
        this.annotations=response.annotations;

        this.annotations.forEach((annotation) => {
          const start = annotation.target.start;
          const end = annotation.target.end;
          this.Annotations.push(new Annotation(start, end, annotation.body.value , '#0d6efd'))

          console.log('Updated Annotations:', this.Annotations);

        });

        
      },
      (error) => {
        console.error('Error fetching poll:', error);
      }
    );
  }

}
