import { Component } from '@angular/core';

import { HeaderComponent } from './ui/header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FooterComponent } from "./ui/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SignupComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'markt';
}
