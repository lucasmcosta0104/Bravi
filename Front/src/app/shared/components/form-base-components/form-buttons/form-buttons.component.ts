
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { materialModules } from '../../../../modules/material.module';
import { CommonModule } from '@angular/common';

import { Location } from '@angular/common';

@Component({
  selector: 'app-form-buttons',
  standalone: true,
  imports: [CommonModule,...materialModules],
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.scss'],
})
export class FormButtonsComponent implements OnInit{
  @Input() isLoading = false;
  @Input() buttonText = 'Salvar';
  @Output() limparClick = new EventEmitter<void>();
  @Output() gerarVendaClick = new EventEmitter<void>();
  @Input() limparDisabled = false;
  @Output() voltarClick = new EventEmitter<void>();
  @Input() submitVisible = true;
  limparVisible = false;
  voltarVisible = false;
  
  constructor(private location: Location) {}

  ngOnInit(): void {
    this.limparVisible = (this.limparClick.observers.length > 0);
  }

  voltar() {
    if(this.voltarClick.observers.length > 0)
      this.voltarClick.emit();
    else
      this.location.back();
  }
}
