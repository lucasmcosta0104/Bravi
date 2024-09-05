/* eslint-disable no-prototype-builtins */
import { FormGroup } from '@angular/forms';

export class GenericValidator {
  constructor(private validationMessages: ValidationMessages) {}

  processarMensagens(container: FormGroup): Record<string, string> {
    const messages = {} as any;
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey];

        if (c instanceof FormGroup) {
          const childMessages = this.processarMensagens(c);
          Object.assign(messages, childMessages);
        } else {
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map((messageKey) => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] +=
                    this.validationMessages[controlKey][messageKey] + '<br />';
                }
              });
            } else if ((!c.dirty || !c.touched) && c.invalid && c.errors) {
              Object.keys(c.errors).map((messageKey) => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] +=
                    this.validationMessages[controlKey][messageKey] + '<br />';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}

export type DisplayMessage = Record<string, string>;
export type ValidationMessages = Record<string, Record<string, string>>;
