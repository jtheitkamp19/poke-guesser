import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { HttpService } from './http.service';
import { MathService } from './math.service';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  GENERATION_CUTOFFS = [1, 152, 252, 387, 494, 650, 722, 808, 892];
  POKEMON_URL = 'pokemon/';
  NAME_URL = this.POKEMON_URL + 'name/';
  FAMILY_URL = this.POKEMON_URL + 'family/';

  constructor(readonly http: HttpClient, readonly httpheaders: HttpService, readonly math: MathService) { }

  fetchPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(environment.databaseURL + this.POKEMON_URL + id, {headers: this.httpheaders.getRequestHeaders()});
  }

  fetchPokemonByName(name: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(environment.databaseURL + this.NAME_URL + name, {headers: this.httpheaders.getRequestHeaders()});
  }

  fetchFamilyForPokemonWithId(id: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(environment.databaseURL + this.FAMILY_URL + id, {headers: this.httpheaders.getRequestHeaders()});
  }

  getIdInSelectedGenerations(selectedGenerations: boolean[]): number {
    var validRanges = [];

    for (var i = 0; i < selectedGenerations.length; i++) {
      if (selectedGenerations[i]) {
        validRanges.push([this.GENERATION_CUTOFFS[i], this.GENERATION_CUTOFFS[i + 1]]);
      }
    }

    if (validRanges.length > 0) {
      var selectedRange = this.math.getRandomNumberBetween(0, validRanges.length);
      return this.math.getRandomNumberBetween(validRanges[selectedRange][0], validRanges[selectedRange][1]);
    }

    return 0;
  }
}
