/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { materialModules } from '../../../modules/material.module';

@Component({
  selector: 'app-button-crud-grid',
  standalone: true,
  imports: [...materialModules],
  templateUrl: './button-crud-grid.component.html',
})
export class ButtonCrudGridComponent {
  @Input() onAdd: () => void = () => {};
  @Input() onEdit: (id: string) => void = () => {};
  @Input() onDelete: () => void = () => {};

  onAddClick() {
    this.onAdd();
  }

  onEditClick(id: string) {
    this.onEdit(id);
  }

  onDeleteClick() {
    this.onDelete();
  }
}
