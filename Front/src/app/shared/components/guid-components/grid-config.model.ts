export interface GridFilterItem {
  Name: string;
  Field: string;
  Null: boolean;
  Tipo: string;
  valueEnums?: GridEnum[];
  defaultValue?: number;
  isCurrency?: boolean;
}

export interface GridEnum {
  label: string;
  value?: number;
}

export interface ActionItem {
  iconName: string;
  action: (id?: string) => void;
  name: string;
}

export interface GridConfig {
  apiUrl?: string;
  id?: string;
  filterOrder: {
    Name: string;
    Tipo: string;
  };
  filterItens: GridFilterItem[];
  actions?: ActionItem[];
  actionAdicionar?: () => void;
  actionEditar?: (id: any) => void;
  actionVisualizar?: (id: any) => void;
  actionExcluir?: (id: any) => void;
  actionExcluirMultiplos?: (listId: any) => void;
}

export interface Filtro {
  propriedade: string;
  valor: string;
  tipo: string;
  isIgual: boolean;
}

export interface ModelFilter {
  page: number;
  pageSize: number;
  orderBy: string;
  orderDirection: string;
  camposFiltro: Filtro[];
}

export interface GridRequest {
  id?: string;
  modelFilter: ModelFilter;
}
