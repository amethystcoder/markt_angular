import { Component, Input } from '@angular/core';

type availableStates = "load1" | "load2" | "load3" | "load4" | "load5" | "error" | "no network" | ""

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  @Input({required:true}) loadState: availableStates = "";
}
