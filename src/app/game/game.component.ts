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
    this.types = this.pokemon?.types as Type[];
  }

  ngOnInit(): void {
  }

}
