import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Type } from '../models/type.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() pokemon: Pokemon | null = null;
  @Input() selectedGenerations: boolean[] = [false, false, false, false, false, false, false, false];
  familyData = [1, 2, 3];
  searchValue = "";
  types: Type[] = [];

  constructor() { 
    console.log(this.pokemon);
  }

  ngOnInit(): void {
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
