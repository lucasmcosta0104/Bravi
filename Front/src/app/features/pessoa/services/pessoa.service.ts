import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { PessoaModel } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService extends BaseService {

  obterPorId(id: string): Observable<PessoaModel> {
    console.log(id);
    return this
      .get<PessoaModel>('pessoa/' + id)
      .pipe(map(super.extractData));
  }


  novo(pessoa: PessoaModel): Observable<PessoaModel> {
    return this
      .post<PessoaModel>('pessoa', pessoa)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  excluir(id: string): Observable<PessoaModel> {
    return this
      .delete<PessoaModel>('pessoa/' + id)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  atualizar(pessoa: PessoaModel, id: string): Observable<PessoaModel> {
    return this
      .put<PessoaModel>(
        'pessoa/' + id,
        pessoa,
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }
}
