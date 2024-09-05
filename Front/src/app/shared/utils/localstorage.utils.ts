export class LocalStorageUtils {
  public obterUsuario() {
    return JSON.parse(localStorage.getItem('erp.user') ?? '');
  }

  public salvarDadosLocaisUsuario(response: any) {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem('erp.token');
    localStorage.removeItem('erp.user');
  }

  public obterTokenUsuario(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
        return localStorage.getItem('erp.token') ?? '';
    }
    return '';
}

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('erp.token', token);
  }

  public salvarUsuario(user: string) {
    localStorage.setItem('erp.user', JSON.stringify(user));
  }
}
