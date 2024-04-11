import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function amountSumValidator(distributionControlName: string, amountControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const distributionControl = control?.parent?.get(distributionControlName) as AbstractControl;
      const amount = control?.parent?.get(amountControlName)?.value;
      console.log("amount: ", amount);
      
      let sum: number = 0;
      const value: { userId: number; amount: number }[] = control.value;
      if(!distributionControl){
        return null;
      }
  
      if(distributionControl.value === 'exact_amounts'){
        value.forEach((memberObj) => {
          //erre a kasztolgatásra azért van szükség, mert hiába number a typeja elvileg, de gyakorlatilag string értéket kap a sum
          const amountString =  memberObj.amount.toString();
          sum += parseInt(amountString);
          
          
        });
        
        if (sum > amount) {
          return { tooMuch: true };
        } else if (sum < amount) {
          return { tooShort: true };
        }else{
          return null;
        }
      }
      
      return null;
    };
  }