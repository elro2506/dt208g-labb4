import { Component, inject, signal } from '@angular/core';
import { Kursschema } from '../models/kursschema';
import { Services } from '../services';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
kursschema = signal<Kursschema[]>([]);
error = signal<string | null>(null);

kursschemaServices = inject(Services);

//Körs när användargränssnittet är renderat och klart
ngOnInit() {
  this.loadKursschema();
}

async loadKursschema() {
  try {
const response = await this.kursschemaServices.loadKursschema();
this.kursschema.set(response);
console.table(this.kursschema());
  } catch(error) {
console.log(error);
this.error.set("Kunde inte ladda data");
  }
}
}