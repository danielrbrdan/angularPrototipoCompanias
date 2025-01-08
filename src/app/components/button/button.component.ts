import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  @Output() onClick = new EventEmitter<any>();

  @Input() class = "btn-primary";

  _onClick(event: MouseEvent) {
    this.onClick.emit(event);
  }
}
