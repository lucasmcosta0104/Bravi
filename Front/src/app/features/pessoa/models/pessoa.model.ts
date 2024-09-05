export interface PessoaModel {
    id: string;
    nome: string;
    documento: string;
    telefone: string;
    email: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    cep: string;
    estado: string;
    nomeFantasia?: string;
    inscricaoMunicipal?: string;
    inscricaoEstadual?: string;
    observacoes?: string;
}