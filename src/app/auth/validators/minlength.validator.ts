import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
  
      if (!value || value.length < minLength) {
        return {
          minLength: {
            requiredLength: minLength,
            actualLength: value ? value.length : 0,
          },
        };
      }
  
      return null;
    };
  }
  