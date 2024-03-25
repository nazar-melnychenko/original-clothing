import {ValidatorFn} from '@angular/forms';

export const specialCharactersValidator = (): ValidatorFn => {
  return (control) => {
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);

    return hasSpecialCharacter ? {hasSpecialCharacter: true} : null;
  };
}
