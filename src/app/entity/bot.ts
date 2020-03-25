import { Operation } from './operation';
import { Direction } from './direction';
import { Posicao } from './posicao';

export class Bot {
  id: number;
  name = '';
  boolValue: boolean;
  operation: Operation;
  speed: number;
  direction: Direction;
  color: string;
  posicaoInicial: Posicao;

  constructor(id: number, color: string) {
    this.id = id;
    this.name = '';
    this.boolValue = null;
    this.operation = null;
    this.speed = 1;
    this.direction = null;
    this.color = color;
    this.posicaoInicial = new Posicao(-1, -1);
  }

  toString() {
    return 'Bot [id:' + this.id + ' name: ' + this.name + ' boolValue: ' + this.boolValue +
    ' operation: ' + this.operation + ' speed: ' + this.speed +
    ' direction ' + this.direction + ']';
  }

  update(bot: Bot) {
    this.name = bot.name;
    this.boolValue = bot.boolValue;
    this.operation = bot.operation;
    this.speed = bot.speed;
    this.direction = bot.direction;
  }
}
