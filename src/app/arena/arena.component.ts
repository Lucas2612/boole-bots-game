import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {

  arena: number[][];
  constructor() {
    this.arena = [];
    for (let i = 0; i < 8; i++) {
        this.arena[i] = [];
        for (let j = 0; j < 8; j++) {
            this.arena[i][j] = 0;
        }
    }
  }

  ngOnInit(): void {
  }

}
