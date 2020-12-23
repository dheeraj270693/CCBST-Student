import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl} from "@angular/forms";

import { IonicModule } from '@ionic/angular';
import { ReferralPageRoutingModule } from './referral-routing.module';

import { ReferralPage } from './referral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReferralPageRoutingModule
  ],
  declarations: [ReferralPage]
})
export class ReferralPageModule {}
