import { Component } from '@angular/core';
import { TopHeaderComponent } from '../top-header/top-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TopHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
