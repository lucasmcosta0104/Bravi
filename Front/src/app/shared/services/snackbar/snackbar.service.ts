import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ErrorResponseModel } from '../../../core/models/response.model';

interface configDefault {
  duration: number;
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  fechar = ' X ';
  configDefault: configDefault = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  private showSnackbar(content: string, panelClass: string[]) {
    const sb = this.snackBar.open(content, this.fechar, {
      ...this.configDefault,
      panelClass: panelClass,
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  showSnackbarSuccess(content: string) {
    this.showSnackbar('✅ ' + content, ['snackbar-success']);
  }

  showSnackbarError(content: string) {
    this.showSnackbar('❌ ' + content, ['snackbar-error']);
  }

  showSnackbarWarn(content: string) {
    this.showSnackbar('⚠️ ' + content, ['snackbar-warn']);
  }

  showSnackbarInfo(content: string) {
    this.showSnackbar('ℹ️ ' + content, ['snackbar-info']);
  }

  showSnackbarErrors(fail: ErrorResponseModel) {
    const joinedMessages = fail.errors.join(' | ');

    this.showSnackbarError(joinedMessages);
  }
}
