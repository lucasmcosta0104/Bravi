import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MenuComponent, FooterComponent],
  templateUrl: './main-layout-component.html',
})
export class MainLayoutComponent {
  @ViewChild(MenuComponent)
  menuComponent!: MenuComponent;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isMobile = true;
  isCollapsed = true;

  toggleMenu() {
    if (this.menuComponent) {
      this.menuComponent.toggleSidenav();
    }
  }
}
