import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-danger-alert',
  templateUrl: './danger-alert.component.html',
  styleUrl: './danger-alert.component.css',
})
export class DangerAlertComponent {
  @Input() content: {
    condition?: boolean | null | undefined;
    message: string;
  } = { condition: false, message: '' };
}
