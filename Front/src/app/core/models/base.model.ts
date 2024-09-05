export interface BaseModel {
  id: string;
  dataCriacao: Date;
  dataAlteracao: Date;
  status: string;
}

export interface BasePageModel {
  count: number;
  numeroPagina: number;
  quantidadePagina: number;
  quantidadePorPagina: number;
}
