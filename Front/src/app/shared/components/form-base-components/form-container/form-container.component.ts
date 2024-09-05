import { Component, Input } from '@angular/core';
import { materialModules } from '../../../../modules/material.module';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [...materialModules],
  templateUrl: './form-container.component.html',
})
export class WrapperComponent {
  @Input() icon = '';
  @Input() title = '';
}
