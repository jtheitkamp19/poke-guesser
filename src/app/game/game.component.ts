import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { Pokemon } from '../models/pokemon.model';
import { Type } from '../models/type.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() pokemonData: Pokemon[] = [];
  @Input() selectedGenerations: boolean[] = [false, false, false, false, false, false, false, false];
  @Input() pokemonId: number = 0;
  searchValue = "";
  types: Type[] = [];
  pokemon: Pokemon | undefined;

  constructor() { 
    
  }

  ngOnInit(): void {
    this.pokemon = _.find(this.pokemonData, pokemonInList => {
      return pokemonInList.number == this.pokemonId;
    });

    this.types = this.pokemon?.types as Type[];

    if (this.types.length <= 1) {
      if (this.types.length == 0) {
        this.types.push({
          typeid: 20,
          type: 'None'
        });
      }
      
      this.types.push({
        typeid: 20,
        type: 'None'
      });
    }
  }

}
