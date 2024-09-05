import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { materialModules } from '../../../modules/material.module';
import { MenuItem, itemsMenu } from './menu.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    RouterLinkActive,
    MatExpansionModule,
    NgxSpinnerModule,
    ...materialModules,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuItems: MenuItem[] = itemsMenu;
  selectedPanelTitle = '';
  selectedSubPanelTitle = '';
  searchControl = new FormControl('');
  openPanels = new Set<string>();
  filteredMenuItems = this.menuItems;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private cdr: ChangeDetectorRef) {
    this.searchControl.valueChanges.subscribe((searchText: string | null) => {
      this.filteredMenuItems = this.filterMenuItems(searchText ?? '');
      this.cdr.detectChanges(); // Marcar mudanças para evitar o erro ExpressionChangedAfterItHasBeenCheckedError
    });
  }

  filterMenuItems(searchText: string): MenuItem[] {
    if (!searchText) {
      this.openPanels.clear(); // Fecha todos os painéis
      return this.menuItems;
    }

    const filterRecursively = (
      items: MenuItem[],
      searchText: string
    ): MenuItem[] => {
      return items.reduce<MenuItem[]>((acc, item) => {
        const filteredSubItems = item.children
          ? filterRecursively(item.children, searchText)
          : [];

        if (
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          filteredSubItems.length > 0
        ) {
          acc.push({
            ...item,
            children:
              filteredSubItems.length > 0 ? filteredSubItems : item.children,
          });

          this.openPanels.add(item.title);
        }

        return acc;
      }, []);
    };

    return filterRecursively(this.menuItems, searchText);
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.filteredMenuItems = this.menuItems;
    this.openPanels.clear();
  }

  selectPanel(title: string) {
    this.selectedPanelTitle = this.selectedPanelTitle === title ? '' : title;
    this.selectedSubPanelTitle = '';
  }

  isSelected(title: string): boolean {
    return this.selectedPanelTitle === title;
  }

  toggleSubPanel(title: string) {
    this.selectedSubPanelTitle =
      this.selectedSubPanelTitle === title ? '' : title;
  }

  isSubPanelOpen(title: string): boolean {
    return this.selectedSubPanelTitle === title;
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
