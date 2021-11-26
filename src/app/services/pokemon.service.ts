import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  GENERATION_CUTOFFS = [1, 152, 252, 387, 494, 650, 722, 808, 892];
  POKEMON_URL = 'pokemon/';
  NAME_URL = this.POKEMON_URL + 'name/';

  constructor(readonly http: HttpClient, readonly httpheaders: HttpService) { }

  fetchPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(environment.databaseURL + this.POKEMON_URL + id, {headers: this.httpheaders.getRequestHeaders()});
  }

  fetchPokemonByName(name: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(environment.databaseURL + this.NAME_URL + name, {headers: this.httpheaders.getRequestHeaders()});
  }

  getIdInSelectedGenerations(selectedGenerations: boolean[]): number {
    var potentialId = this.getRandomPokemonId();

    if (!this.validatePokemonId(selectedGenerations, potentialId)) {
      potentialId = this.getRandomPokemonId();
    }

    return potentialId;
  }

  getRandomPokemonId() {
    return Math.floor(Math.random() * (this.GENERATION_CUTOFFS[this.GENERATION_CUTOFFS.length - 1] - 1) + 1);
  }

  validatePokemonId(selectedGenerations: boolean[], id: number): boolean {
    for (var i = 0; i < selectedGenerations.length; i++) {
      console.log(`id: ${id}; generationCutoff: ${this.GENERATION_CUTOFFS[i]}; uppderGenCutoff: ${this.GENERATION_CUTOFFS[i+1]}`);
      console.log(`returning: ${selectedGenerations[i] && id >= this.GENERATION_CUTOFFS[i] && id < this.GENERATION_CUTOFFS[i + 1]}`)
      return selectedGenerations[i] && id >= this.GENERATION_CUTOFFS[i] && id < this.GENERATION_CUTOFFS[i + 1]
    }

    return false;
  }
}
