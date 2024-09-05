export class Patterns {
    static readonly SENHA_FORTE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    static readonly EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    static readonly PHONE_PATTERN = /^\+?[1-9]\d{1,14}$/;
    static readonly CEP_PATTERN = /^\d{5}-\d{3}$/;
    static readonly CPF_CNPJ_PATTERN = /^[0-9]{10,18}$/;
  }