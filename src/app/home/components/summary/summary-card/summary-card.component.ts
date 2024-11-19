import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  @Input() number: number = 0;
  @Input() type: string = '';
  @Input() imgPath: string = '';
  @Input() content: string = '';
  @Input() routeTo: string = '';
  @Input() deadline: string = ' 2023-08-25';
}
