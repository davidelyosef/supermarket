import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent {

  @Input() imgUrl: string;
  @Input() name: any;
  @Input() text: any;

}
