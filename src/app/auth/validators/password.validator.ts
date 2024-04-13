import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
  
      const capitalRegex = /[A-Z]/;
      if (!capitalRegex.test(value)) {
        return { capital: true };
      }
  
      const numberRegex = /[0-9]/;
      if (!numberRegex.test(value)) {
        return { number: true };
      }
  
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (!specialCharRegex.test(value)) {
        return { specialChar: true };
      }
  
      return null;
    };
  }