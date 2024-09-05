import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { catchError, map, Observable } from 'rxjs';
import { ContatoModel } from '../models/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService extends BaseService {
  adicionarContato(data: ContatoModel) {
    return this
      .post<ContatoModel>('Contato', data)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }


  obterPorId(id: string): Observable<ContatoModel> {
    console.log(id);
    return this
      .get<ContatoModel>('Contato/' + id)
      .pipe(map(super.extractData));
  }

  obter(): Observable<ContatoModel[]> {
    return this
      .get<ContatoModel[]>('Contato')
      .pipe(map(super.extractData));
  }

  excluir(id: string): Observable<ContatoModel> {
    return this
      .delete<ContatoModel>('Contato/' + id)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  excluirMultiplos(ids: string[]): Observable<ContatoModel> {
    const body = { ids };
    return this
      .deleteMultiplos<ContatoModel>('Contato/ExcluirMultiplos', { body })
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  atualizar(Contato: ContatoModel, id: string): Observable<ContatoModel> {
    return this
      .put<ContatoModel>(
        'Contato/' + id,
        Contato,
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }
}