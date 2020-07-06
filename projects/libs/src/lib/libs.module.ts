import { NgModule } from '@angular/core';
import { LibsComponent } from './libs.component';
import { FormManagerModule } from './form-manager';



@NgModule({
  declarations: [LibsComponent],
  imports: [
  ],
  exports: [FormManagerModule]
})
export class LibsModule { }
