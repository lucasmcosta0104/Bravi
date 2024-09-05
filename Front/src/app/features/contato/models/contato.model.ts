import { BaseModel } from "../../../core/models/base.model";

export interface ContatoModel extends BaseModel {
  id: string;
  nome: string;
  telefone: string;
  whatsApp: string;
  email: string;
  pessoaId: string;
}