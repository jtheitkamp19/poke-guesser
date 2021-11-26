import { Component } from '@angular/core';
import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './services/pokemon.service';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poke-guesser';
  pokemon: Pokemon;
  showSelection: boolean = true;
  selectedGenerations: boolean[] = [false, false, false, false, false, false, false, false];
  isGen1Selected: boolean;
  isGen2Selected: boolean;
  isGen3Selected: boolean;
  isGen4Selected: boolean;
  isGen5Selected: boolean;
  isGen6Selected: boolean;
  isGen7Selected: boolean;
  isGen8Selected: boolean;

  constructor(readonly pokeService: PokemonService) {

  }

  startGame() {
    console.log("Starting Game");
    this.showSelection = false;

    this.selectedGenerations = [
      this.isGen1Selected,
      this.isGen2Selected,
      this.isGen3Selected,
      this.isGen4Selected,
      this.isGen5Selected,
      this.isGen6Selected,
      this.isGen7Selected,
      this.isGen8Selected
    ];

    var isAnyGenerationSelected = _.any(this.selectedGenerations, generation => {
      return generation;
    });

    if (isAnyGenerationSelected) {
      var pokeId = this.pokeService.getIdInSelectedGenerations(this.selectedGenerations);

      this.pokeService.fetchPokemonById(pokeId).subscribe(data => {
        console.log(data);
        this.pokemon = data;
      })
    } else {
      console.log("No Generation Selected");
      alert("No Generation Selected");

      this.showSelection = true;
    }
  }
}
