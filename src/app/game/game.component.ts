import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() pokemon: Pokemon | null = null;
  @Input() selectedGenerations: boolean[] = [false, false, false, false, false, false, false, false];

  constructor() { }

  ngOnInit(): void {
  }

}
