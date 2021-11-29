import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { keys } from 'underscore';
import { EMPTY_POKEMON } from '../models/empty-pokemon';
import { Pokemon } from '../models/pokemon.model';
import { Type } from '../models/type.model';
import { PokemonService } from '../services/pokemon.service';

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
  currentPokemon: Pokemon | undefined;
  pokemon: Pokemon = EMPTY_POKEMON;
  gameWon = false;
  guesses: string[] = [];
  lengthKnown = false;
  type1Known = false;
  type2Known = false;
  isSearchInProgress = false;

  constructor(readonly pokeService: PokemonService) { 
    
  }

  ngOnInit(): void {
    this.currentPokemon = _.find(this.pokemonData, pokemonInList => {
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

  wonGame() {
    console.log("game won!");
    alert("you win!");
  }

  search() {
    if (!this.isSearchInProgress) {
      this.pokeService.fetchPokemonByNameMatching(this.searchValue).subscribe(response => {
        _.each(response, (pokemonInList) => {
          this.guesses.push(pokemonInList.name);
          this.checkSearchPokemonVsCurrentPokemon(pokemonInList);
          this.isSearchInProgress = false;
          this.searchValue = '';
        });
      })
    } else {
      alert("current search in progress");
    }
  }

  checkSearchPokemonVsCurrentPokemon(searchResult: Pokemon) {
    if (_.isUndefined(this.currentPokemon)) {

    } else {
      if (searchResult.number == this.currentPokemon.number) {
        this.gameWon = true;
        this.pokemon.number = this.currentPokemon.number;
      }
  
      if (searchResult.name == this.currentPokemon.name || this.gameWon) {
        this.pokemon.name = this.currentPokemon.name;
      }
  
      if (searchResult.generation == this.currentPokemon.generation || this.gameWon) {
        this.pokemon.generation = this.currentPokemon.generation;
      }
  
      if (Math.abs(searchResult.height - this.currentPokemon.height) <= .5 || this.gameWon) {
        this.pokemon.height = this.currentPokemon.height;
      }

      if (Math.abs(searchResult.weight - this.currentPokemon.weight) <= 1 || this.gameWon) {
        this.pokemon.weight = this.currentPokemon.weight;
      }

      if (searchResult.hp == this.currentPokemon.hp || this.gameWon) {
        this.pokemon.hp = this.currentPokemon.hp;
      }

      if (searchResult.attack == this.currentPokemon.attack || this.gameWon) {
        this.pokemon.attack = this.currentPokemon.attack;
      }

      if (searchResult.defense == this.currentPokemon.defense || this.gameWon) {
        this.pokemon.defense = this.currentPokemon.defense;
      }

      if (searchResult.spatk == this.currentPokemon.spatk || this.gameWon) {
        this.pokemon.spatk = this.currentPokemon.spatk;
      }

      if (searchResult.spdef == this.currentPokemon.spdef || this.gameWon) {
        this.pokemon.spdef = this.currentPokemon.spdef;
      }

      if (searchResult.speed == this.currentPokemon.speed || this.gameWon) {
        this.pokemon.speed = this.currentPokemon.speed;
      }

      if (searchResult.familyid == this.currentPokemon.familyid || this.gameWon) {
        this.lengthKnown = true;
        this.pokemon.familyid = this.currentPokemon.familyid;
      }

      if (searchResult.evonum == this.currentPokemon.evonum || this.gameWon) {
        this.pokemon.evonum = this.currentPokemon.evonum;
      }

      if (searchResult.color == this.currentPokemon.color || this.gameWon) {
        this.pokemon.color = this.currentPokemon.color;
      }

      if (!this.gameWon) {
        var guessTypes = searchResult.types;
        var currentTypes = this.currentPokemon.types;

        for (var i = 0; i < guessTypes.length; i++) {
          for (var x = 0; x < currentTypes.length; x++) {
            if (guessTypes[i] == currentTypes[x] && !_.contains(this.pokemon.types, currentTypes[x])) {
              this.pokemon.types.push(currentTypes[x]);
  
              if (this.pokemon.types.length == 1) {
                this.type1Known = true;
              } else {
                this.type2Known = true;
              }

              this.types = this.pokemon.types;
            }
          }
        }
      } else {
        this.pokemon.types = this.currentPokemon.types;
        this.types = this.pokemon.types;
        this.type1Known = true;
        this.type2Known = true;
        this.wonGame();
      }
    }
  }
}
