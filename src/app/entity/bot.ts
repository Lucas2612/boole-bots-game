import { Operation } from './operation';
import { Direction } from './direction';

export class Bot {
  id: number;
  name = '';
  boolValue: boolean;
  operation: Operation;
  speed: number;
  direction: Direction;

  constructor(id: number) {
    this.id = id;
    this.name = '';
    this.boolValue = null;
    this.speed = 1;
    this.direction = null;
  }

  toString() {
    return 'Bot [id:' + this.id + ' name: ' + this.name + ' boolValue: ' + this.boolValue +
    ' operation: ' + this.operation + ' speed: ' + this.speed +
    ' direction ' + this.direction + ']';
  }
}
