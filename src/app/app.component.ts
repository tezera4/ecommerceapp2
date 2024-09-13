import { Component, ElementRef, NgModule, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterModel } from './model/product';

import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerceapp';
  registermodel!: RegisterModel;
  @ViewChild("registerModel") registerModel: ElementRef | undefined;
  openRegisterModel() {
    console.log("Before if");
    if (this.registerModel) {
      console.log("inside if===");
      this.registerModel.nativeElement.style.display = 'block';
    }

  }

  closeRegister() {
    console.log("before if===");
    if (this.registerModel) {
      console.log("inside if===");
      this.registerModel.nativeElement.style.display = 'none';
    }
  }
  saveRegister() {

  }
}
