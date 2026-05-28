import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Kursschema } from './models/kursschema';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Services {
  private url: string ="https://webbutveckling.miun.se/files/ramschema.json";

  http = inject(HttpClient);

  //Ladda kursschemat
  async loadKursschema(): Promise<Kursschema[]> {
    const kursschema = this.http.get<Kursschema[]>(this.url);
    return await firstValueFrom(kursschema);
  }
}
