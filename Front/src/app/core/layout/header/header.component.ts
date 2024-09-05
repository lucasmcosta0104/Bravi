import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';
import { materialModules } from '../../../modules/material.module';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [MenuComponent, NgProgressModule, ...materialModules, CommonModule],
})
export class HeaderComponent {
  dataAtual = '';

  constructor(private router: Router) {}

  @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();
  startedClass = false;
  completedClass = false;
  today: Date = new Date();
  onToggleMenu() {
    this.toggleMenu.emit();
  }

  navigateToHome() {
    this.router.navigate(['/pessoa']);
  }
}
