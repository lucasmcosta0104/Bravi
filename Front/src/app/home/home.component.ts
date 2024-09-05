import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { materialModules } from '../modules/material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...materialModules, NgxChartsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  single = single;
  singleBar = singleBar;
  multi = multi;

  view: number[] = [700, 400];

  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  legend = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Ano';
  yAxisLabel = 'Quantidade de Vendas';
  timeline = true;

  showXAxis = true;
  showYAxis = true;
  gradientBar = false;
  xAxisLabelBar = 'Produto';
  yAxisLabelBar = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor() {
    Object.assign(this.single);
  }

  onSelect(data: any): void {
    console.log('Item clicado', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Ativar', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Desativar', JSON.parse(JSON.stringify(data)));
  }
}

export const multi = [
  {
    name: 'Brasil',
    series: [
      {
        name: '2022',
        value: 1500,
      },
      {
        name: '2023',
        value: 1700,
      },
      {
        name: '2024',
        value: 1850,
      },
    ],
  },
  {
    name: 'Argentina',
    series: [
      {
        name: '2022',
        value: 800,
      },
      {
        name: '2023',
        value: 950,
      },
      {
        name: '2024',
        value: 1100,
      },
    ],
  },
  {
    name: 'Chile',
    series: [
      {
        name: '2022',
        value: 700,
      },
      {
        name: '2023',
        value: 750,
      },
      {
        name: '2024',
        value: 850,
      },
    ],
  },
];

export const singleBar = [
  {
    name: 'Produto A',
    value: 300000,
  },
  {
    name: 'Produto B',
    value: 200000,
  },
  {
    name: 'Produto C',
    value: 150000,
  },
];

export const single = [
  {
    name: 'São Paulo',
    value: 500000,
  },
  {
    name: 'Rio de Janeiro',
    value: 300000,
  },
  {
    name: 'Minas Gerais',
    value: 250000,
  },
  {
    name: 'Bahia',
    value: 200000,
  },
];
