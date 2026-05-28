import { Component, computed, inject, signal } from '@angular/core';
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
sortColumn = signal<keyof Kursschema>('code');
sortBy(column: keyof Kursschema) {
  this.sortColumn.set(column);
}

filterText = signal("");
filterCourses = computed(() => {
  const filter = this.filterText().trim().toLocaleLowerCase();
  const column = this.sortColumn();

  let courses = this.kursschema();

  if(filter) {
    courses = courses.filter(kurs => 
    kurs.code.toLowerCase().includes(filter) || 
    kurs.coursename.toLowerCase().includes(filter)
  );
}

return [...courses].sort((a, b) => String(a[column]).localeCompare(String(b[column])));
});

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