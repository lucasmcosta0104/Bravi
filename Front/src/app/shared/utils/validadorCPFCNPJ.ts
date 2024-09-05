import { AbstractControl, ValidatorFn } from '@angular/forms';

export function cpfValidator(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (!cpf) {
      return true;
    }

    if (cpf.length !== 11 || /^[0-9]{11}$/.test(cpf) === false) {
      return true;
    }

    let sum = 0;
    let remainder: number;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
      return true;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(10))) {
      return true;
    }

    return false;
}

export function cnpjValidator(cnpj: string) {
      cnpj = cnpj.replace(/[^\d]+/g, ''); 
      
      if (!cnpj) {
        return true; 
      }

      if (cnpj.length !== 14 || /^[0-9]{14}$/.test(cnpj) === false) {
        return true;
      }
  
      let sum = 0;
      let remainder: number;
      const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      
      for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * weights1[i];
      }
      remainder = sum % 11;
      if (remainder < 2) {
        remainder = 0;
      } else {
        remainder = 11 - remainder;
      }
      if (remainder !== parseInt(cnpj.charAt(12))) {
        return true;
      }
  
      sum = 0;
      const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      
      for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * weights2[i];
      }
      remainder = sum % 11;
      if (remainder < 2) {
        remainder = 0;
      } else {
        remainder = 11 - remainder;
      }
      if (remainder !== parseInt(cnpj.charAt(13))) {
        return true;
      }
  
      return false;
  }