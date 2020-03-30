import { Operation } from './operation';
import { Direction } from './direction';
import { Position } from './position';

export class Bot {
  id: number;
  name = '';
  boolValue: boolean;
  operation: Operation;
  speed: number;
  direction: Direction;
  color: string;
  position: Position;
  wins: number;

  constructor(id: number, color: string, name: string) {
    this.id = id;
    this.name = name;
    this.boolValue = null;
    this.operation = null;
    this.speed = null;
    this.direction = null;
    this.color = color;
    this.position = new Position(-1, -1);
    this.wins = 0;
  }

  toString() {
    return 'Bot [id:' + this.id + ' color: ' + this.color + ' name: ' + this.name + ' boolValue: ' + this.boolValue +
    ' operation: ' + this.operation + ' speed: ' + this.speed +
    ' direction: ' + this.direction + ' position.x: ' + this.position.x +
    ' position.y: ' + this.position.y + ' wins: ' + this.wins + ']';
  }

  update(bot: Bot) {
    this.name = bot.name;
    this.boolValue = bot.boolValue;
    this.operation = bot.operation;
    this.speed = bot.speed;
    this.direction = bot.direction;
    this.position = bot.position;
  }
}
