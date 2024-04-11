import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function percentSumValidator(distributionControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const distributionControl = control?.parent?.get(distributionControlName) as AbstractControl;
      let sum: number = 0;
      const value: { userId: number; percent: number }[] = control.value;
      if(!distributionControl){
        return null;
      }
  
      if(distributionControl.value === 'proportional'){
        value.forEach((memberObj) => {
          //erre a kasztolgatásra azért van szükség, mert hiába number a typeja elvileg, de gyakorlatilag string értéket kap a sum
          const percentString =  memberObj.percent.toString();
          sum += parseInt(percentString);
          
          
        });
        console.log("sum: ", sum);
        
        if (sum > 100) {
          return { tooMuch: true };
        } else if (sum < 100) {
          return { tooShort: true };
        }else{
          return null;
        }
      }
      
      return null;
    };
  }