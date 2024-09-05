import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './input-wrapper.component.html',
  styleUrl: './input-wrapper.component.scss',
})
export class InputWrapperComponent {
  @Input() label = '';
}
