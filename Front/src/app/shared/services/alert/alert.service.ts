import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {
    //
  }

  showAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    options?: SweetAlertOptions
  ) {
    Swal.fire({
      title,
      text,
      icon,
      ...options,
      customClass: {
        confirmButton: 'swal2-custom-btn swal2-confirm-btn',
        ...options?.customClass,
      },
    });
  }

  showSuccess(title: string, text: string, options?: SweetAlertOptions) {
    this.showAlert(title, text, 'success', options);
  }

  showError(title: string, text: string, options?: SweetAlertOptions) {
    this.showAlert(title, text, 'error', options);
  }

  showWarning(title: string, text: string, options?: SweetAlertOptions) {
    this.showAlert(title, text, 'warning', options);
  }

  showInfo(title: string, text: string, options?: SweetAlertOptions) {
    this.showAlert(title, text, 'info', options);
  }

  async confirm(
    title: string,
    text: string,
    options?: SweetAlertOptions
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      focusCancel: true,
      ...options,
      customClass: {
        confirmButton: 'swal2-custom-btn swal2-confirm-btn',
        cancelButton: 'swal2-custom-btn swal2-cancel-btn',
        ...options?.customClass,
      },
    }).then((result: any) => {
      return result.isConfirmed;
    });
  }
}
