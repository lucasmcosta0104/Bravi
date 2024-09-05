import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { materialModules } from '../../../../modules/material.module';

import { GridFieldDecimalPipe } from '../../../pipes/grid-field-decimal.pipe';
import {
  Filtro,
  GridConfig,
  GridRequest,
  ModelFilter,
} from '../grid-config.model';

@Component({
  selector: 'app-grid-lite-component',
  standalone: true,
  imports: [
    CommonModule,
    ...materialModules,
    FormsModule,
    GridFieldDecimalPipe,
  ],
  templateUrl: './grid-lite.component.html',
  styleUrls: ['./grid-lite.component.scss'],
})
export class GridLiteComponent implements OnInit {
  @Input() config!: GridConfig;
  @Input() icon = '';
  @Input() title = '';

  @Input() data: any[] = [];

  paginatedData: any[] = [];
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  pageSize = 5;
  gridRequest: GridRequest = {} as GridRequest;
  selectedItems = new Set<string>();
  pageSizeOptions = [5, 10];
  isFilterVisible = true;
  value = 0;
  formattedValue = '';

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.gridRequest.modelFilter = {} as ModelFilter;
    this.gridRequest.modelFilter.camposFiltro = [];
    this.displayedColumns = [
      'select',
      ...this.config.filterItens.map((item) => item.Field),
      'actions',
    ];

    this.applyFiltersToData();
  }

  applyFilter(
    field: string,
    event: any,
    tipo = 'string',
    isIgual = true
  ): void {
    const value =
      tipo === 'enum'
        ? (event as HTMLSelectElement).value
        : (event.target as HTMLInputElement).value;

    this.aplicarFiltro(field, value, tipo, isIgual);
    this.applyFiltersToData(); // Reaplicar filtros após adicionar/alterar um filtro
  }

  applyFiltersToData(): void {
    let filteredData = [...this.data];

    this.gridRequest.modelFilter.camposFiltro.forEach((filtro) => {
      filteredData = filteredData.filter((item) => {
        const itemValue = item[filtro.propriedade]?.toString().toLowerCase();
        const filterValue = filtro.valor.toLowerCase();

        if (filtro.isIgual) {
          return itemValue === filterValue;
        } else {
          return itemValue.includes(filterValue);
        }
      });
    });

    this.totalRecords = filteredData.length;
    this.paginatedData = filteredData.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );

    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  aplicarFiltro(
    field: string,
    value: string,
    tipo = 'string',
    isIgual = true
  ): void {
    const existingFilterIndex =
      this.gridRequest.modelFilter.camposFiltro.findIndex(
        (filtro) => filtro.propriedade === field
      );

    if (value && value.trim() !== '') {
      tipo = tipo === 'enum' ? 'inteiro' : tipo;

      const newFilter: Filtro = {
        propriedade: field,
        valor: value.toString(),
        tipo: tipo,
        isIgual: isIgual,
      };

      if (existingFilterIndex !== -1) {
        this.gridRequest.modelFilter.camposFiltro[existingFilterIndex] =
          newFilter;
      } else {
        this.gridRequest.modelFilter.camposFiltro.push(newFilter);
      }
    } else if (existingFilterIndex !== -1) {
      this.gridRequest.modelFilter.camposFiltro.splice(existingFilterIndex, 1);
    }
  }

  actionExcluir(id: string): void {
    this.paginatedData = this.paginatedData.filter((item) => item.id !== id);
    const tempData = this.paginatedData;
    this.paginatedData = [];
    this.paginatedData = tempData;
  }

  toggleSelection(itemId: string): void {
    if (this.selectedItems.has(itemId)) {
      this.selectedItems.delete(itemId);
    } else {
      this.selectedItems.add(itemId);
    }
  }

  toggleAllSelection(event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.paginatedData.forEach((item) => this.selectedItems.add(item.id));
    } else {
      this.selectedItems.clear();
    }
  }

  isSelected(itemId: string): boolean {
    return this.selectedItems.has(itemId);
  }

  isAllSelected(): boolean {
    return this.paginatedData.every((item) => this.selectedItems.has(item.id));
  }

  onPageSizeChange(event: MatSelectChange): void {
    this.pageSize = event.value;
    this.applyFiltersToData();
  }

  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }
}
