import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { materialModules } from '../../../../modules/material.module';

import { GridFieldDecimalPipe } from '../../../pipes/grid-field-decimal.pipe';
import {
  ActionItem,
  Filtro,
  GridConfig,
  GridRequest,
  ModelFilter,
} from '../grid-config.model';
import { AlertService } from './../../../services/alert/alert.service';
import { BaseService } from '../../../../core/services/base.service';
@Component({
  selector: 'app-grid-component',
  standalone: true,
  imports: [
    CommonModule,
    ...materialModules,
    FormsModule,
    GridFieldDecimalPipe,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent extends BaseService implements OnInit {
  @Input() config!: GridConfig;
  @Input() icon = '';
  @Input() title = '';
  paginatedData: any[] = [];
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  pageSize = 10;
  errorMessage: string | null = null;
  gridRequest: GridRequest = {} as GridRequest;
  isModalOpen = false;
  menuOpen = true;
  selectedItems = new Set<string>();
  pageSizeOptions = [5, 10, 20, 50, 100];
  isFilterVisible = true;
  value = 0;
  formattedValue = '';
  filtroData = ',';

  // As colunas exibidas na tabela
  displayedColumns: string[] = [];

  get hasConfigId(): boolean {
    return !!this.config.id;
  }

  ngOnInit(): void {
    this.gridRequest.modelFilter = {} as ModelFilter;
    this.gridRequest.modelFilter.camposFiltro = [];
    this.displayedColumns = [
      'select',
      ...this.config.filterItens.map((item) => item.Field),
      'actions',
    ];
    this.loadPage(this.currentPage);
  }

  async loadPage(page: number): Promise<void> {
    this.currentPage = page;
    if (this.config.id) this.gridRequest.id = this.config.id;
    this.gridRequest.modelFilter.orderBy = this.config.filterOrder.Name;
    this.gridRequest.modelFilter.orderDirection = this.config.filterOrder.Tipo;
    this.gridRequest.modelFilter.page = page;
    this.gridRequest.modelFilter.pageSize = this.pageSize;

    try {
      const response = await lastValueFrom(
        this.post<{ data: any[]; totalRecords: number }>(
          this.config.apiUrl ?? '',
          this.gridRequest
        )
      );

      this.formatDataFields(response.data);
      this.paginatedData = response.data;
      this.totalRecords = response.totalRecords;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      this.errorMessage = null;
    } catch (error) {
      console.error('Erro ao carregar dados da página:', error);
      this.errorMessage =
        'Ocorreu um erro ao carregar os dados. Por favor, tente novamente.';
    }
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

    this.AplicarFiltro(field, value, tipo, isIgual);
  }

  AplicarFiltro(
    field: string,
    value: string,
    tipo = 'string',
    isIgual = true
  ): void {
    const existingFilterIndex =
      this.gridRequest.modelFilter.camposFiltro.findIndex(
        (filtro) => filtro.propriedade === field
      );

    if (!value && existingFilterIndex !== -1) {
      this.gridRequest.modelFilter.camposFiltro.splice(existingFilterIndex, 1);
    }

    tipo = tipo === 'enum' ? 'inteiro' : tipo;

    // Atualiza o filtro existente ou adiciona um novo filtro
    if (existingFilterIndex !== -1 && value) {
      this.gridRequest.modelFilter.camposFiltro[existingFilterIndex] = {
        propriedade: field,
        valor: value.toString(),
        tipo: tipo,
        isIgual: isIgual,
      };
    } else if (value) {
      const newFilter: Filtro = {
        propriedade: field,
        valor: value.toString(),
        tipo: tipo,
        isIgual: isIgual,
      };

      this.gridRequest.modelFilter.camposFiltro.push(newFilter);
    }

    this.loadPage(this.currentPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.loadPage(page);
  }

  verificaMenuAction() {
    return this.config.actions && this.config.actions.length > 0;
  }

  formatDateString(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  formatDataFields(dataList: any[]): void {
    dataList.forEach((item) => {
      this.config.filterItens.forEach((filterItem) => {
        if (filterItem.Tipo === 'data') {
          const value = item[filterItem.Name];
          if (typeof value === 'string') {
            item[filterItem.Name] = this.formatDateString(value);
          }
        }

        if (filterItem.Tipo === 'enum' && filterItem.valueEnums) {
          const value = item[filterItem.Name];
          item[filterItem.Name] = filterItem.valueEnums.find(
            (item) => item.value === value
          )?.label;
        }
      });
    });
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  handleAction(action: ActionItem, id?: string): void {
    action.action(id);
    this.closeMenu();
  }

  actionAdicionar(): void {
    if (this.config.actionAdicionar) {
      this.config.actionAdicionar();
    }
  }

  actionEditar(id: any): void {
    if (this.config.actionEditar) {
      this.config.actionEditar(id);
    }
  }

  actionVisualizar(id: any): void {
    if (this.config.actionVisualizar) {
      this.config.actionVisualizar(id);
    }
  }

  async actionExcluir(id: string) {
    if (this.config.actionExcluir) {
      try {
        if (!id || id.length === 0) {
          this.alertService.showError(
            'Nenhum registro selecionado.',
            'Selecione um registro para realizar a exclusão.'
          );
          return;
        }

        const confirmed = await this.alertService.confirm(
          'Deseja realmente excluir?',
          'Esta ação não pode ser desfeita.'
        );

        if (confirmed) {
          await this.config.actionExcluir(id);
          this.loadPage(this.currentPage);
        }
      } catch (error) {
        console.error('Erro ao excluir item:', error);
        this.errorMessage =
          'Ocorreu um erro ao excluir o item. Por favor, tente novamente.';
      }
    }
  }

  async actionExcluirMultiplos(): Promise<void> {
    if (this.config.actionExcluirMultiplos) {
      try {
        const ids = Array.from(this.selectedItems);

        if (!ids || ids.length === 0) {
          this.alertService.showError(
            'Nenhum registro selecionado.',
            'Selecione um ou mais registros para realizar a exclusão.'
          );
          return;
        }

        const confirmed = await this.alertService.confirm(
          'Deseja realmente excluir os itens selecionados?',
          'Esta ação não pode ser desfeita.'
        );

        if (confirmed) {
          await this.config.actionExcluirMultiplos(ids);
          this.loadPage(this.currentPage);
        }
      } catch (error) {
        console.error('Erro ao excluir múltiplos itens:', error);
        this.errorMessage =
          'Ocorreu um erro ao excluir os itens. Por favor, tente novamente.';
      }
    }
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
    this.loadPage(1);
  }

  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  validateAndFormat(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;

    // Remove todos os caracteres não numéricos e vírgulas
    const numericValue = rawValue.replace(/[^0-9.]/g, '');

    // Adiciona ponto para separador decimal, se necessário
    const decimalIndex = numericValue.indexOf('.');
    let integerPart =
      decimalIndex !== -1
        ? numericValue.substring(0, decimalIndex)
        : numericValue;
    let decimalPart =
      decimalIndex !== -1 ? numericValue.substring(decimalIndex + 1) : '';

    // Limita a parte decimal a 2 dígitos
    decimalPart = decimalPart.substring(0, 2);

    // Limita o total a 17 dígitos, incluindo a parte decimal
    const totalLength =
      17 - (decimalPart.length > 0 ? decimalPart.length + 1 : 0);
    integerPart = integerPart.substring(0, totalLength);

    // Concatena a parte inteira e decimal
    const newFormattedValue = `${integerPart}${
      decimalPart ? '.' + decimalPart : ''
    }`;

    // Atualiza o valor formatado e o valor numérico
    this.formattedValue = newFormattedValue;
    this.value = parseFloat(newFormattedValue) || 0;

    this.AplicarFiltro(field, this.value.toString(), 'decimal');
  }

  aplicarFiltroData(campo: string, filtro: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const valor = this.filtroData.split(',');
    const dataInicial = valor[0];
    const dataFinal = valor[1];

    if (filtro === 'dataInicial') {
      this.filtroData = `${input.value},${dataFinal}`;
    } else if (filtro === 'dataFinal') {
      this.filtroData = `${dataInicial},${input.value}`;
    }

    this.AplicarFiltro(campo, this.filtroData, 'data');
  }

  limparFilter() {
    this.gridRequest.modelFilter.camposFiltro = [];
    this.loadPage(1);
  }
}
