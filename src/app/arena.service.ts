import { Injectable } from '@angular/core';
import { Direction } from './entity/direction';
import { Observable, of } from 'rxjs';
import { Bot } from './entity/bot';
import { delay } from 'rxjs/operators';
import { Operation } from './entity/operation';

@Injectable({
  providedIn: 'root'
})
export class ArenaService {

  SIZE_BOT = 50;
  bots: Bot[];
  constructor() { }

  runTaskBackground(bots: Bot[]): Observable<Bot[]> {
    this.bots = bots;
    // update positions and velocities
    for (let bot of this.bots) {
      bot = this.moveBot(bot);
    }

    // detect colisions
    // bots.forEach(e => e.id && this.detectCollision(bot, e));
    this.bots.forEach((e, indexE) => this.bots.forEach((o, indexO) => indexO > indexE &&
    this.bots.splice(this.detectCollision(e, o), 1) ));
    return of(this.bots).pipe(delay(2000));
  }

  private detectCollision(xBot: Bot, zBot: Bot): number {
    // return index to remove or lenght
    // detect collision
    if (  (Math.abs(xBot.posicao.x - zBot.posicao.x) < this.SIZE_BOT) &&
          (Math.abs(xBot.posicao.y - zBot.posicao.y) < this.SIZE_BOT) ) {
        console.log('Collision: ' + xBot.color + ' >< ' + zBot.color);
        let resultX: boolean;
        let resultZ: boolean;
        // apply rules
        switch (xBot.operation) {
          case (Operation.AND): {
            resultX = xBot.boolValue && zBot.boolValue;
            break;
          }
          case (Operation.OR): {
            resultX = xBot.boolValue || zBot.boolValue;
            break;
          }
          case (Operation.XOR): {  // maybe could be xBot.boolValue !== zBot.boolValue
            resultX = xBot.boolValue ? !zBot.boolValue : zBot.boolValue;
            break;
          }
          case (Operation.NOR): { // maybe could be xBot.boolValue === zBot.boolValue
            console.log('aqui NOR');
            resultX = xBot.boolValue ? zBot.boolValue : !zBot.boolValue;
            break;
          }
        }
        switch (zBot.operation) {
          case (Operation.AND): {
            resultZ = zBot.boolValue && xBot.boolValue;
            break;
          }
          case (Operation.OR): {
            resultZ = zBot.boolValue || xBot.boolValue;
            break;
          }
          case (Operation.XOR): {  // maybe could be xBot.boolValue === zBot.boolValue
            resultZ = zBot.boolValue ? !xBot.boolValue : xBot.boolValue;
            break;
          }
          case (Operation.NOR): { // maybe could be xBot.boolValue !== zBot.boolValue
            console.log('aqui NOR');
            resultZ = zBot.boolValue ? xBot.boolValue : !xBot.boolValue;
            break;
          }
        }

        console.log(xBot.color + ' score: ' + resultX + ' Operation: ' + xBot.boolValue + ' ' +
          Operation[xBot.operation] + ' ' + zBot.boolValue);
        console.log(zBot.color + ' score: ' + resultZ + ' Operation: ' + zBot.boolValue + ' ' +
          Operation[zBot.operation] + ' ' + zBot.boolValue);

        if (resultX && !resultZ) {
          console.log('removing bot ' + zBot);
          return this.bots.indexOf(zBot); }
        if (resultZ && !resultX) {
          console.log('removing bot ' + xBot);
          return this.bots.indexOf(xBot); }

        console.log('tie');

    }

    return this.bots.length;
  }

  private moveBot(xBot: Bot): Bot {
    // apply force
    const distance = xBot.speed * 5;

    switch (xBot.direction) {
      case Direction.EAST: { // EAST
        const changeDir = xBot.posicao.x + distance >= 350;
        xBot.posicao.x = changeDir ? 350 : xBot.posicao.x + distance;
        xBot.direction = changeDir ? Direction.WEST : xBot.direction;
        break;
      }
      case Direction.WEST: { // WEST
        const changeDir = xBot.posicao.x - distance <= 0;
        xBot.posicao.x = changeDir ? 0 : xBot.posicao.x - distance;
        xBot.direction = changeDir ? Direction.EAST : xBot.direction;
        break;
      }
      case Direction.NORTH: {
        const changeDir = xBot.posicao.y - distance <= 0;
        xBot.posicao.y = changeDir ? 0 : xBot.posicao.y - distance;
        xBot.direction = changeDir ? Direction.SOUTH : xBot.direction;
        break;
      }
      case Direction.SOUTH: { // 2
        const changeDir = xBot.posicao.y + distance >= 350;
        xBot.posicao.y = changeDir ? 350 : xBot.posicao.y + distance;
        xBot.direction = changeDir ? Direction.NORTH : xBot.direction;
        break;
      }
    }
    return xBot;
  }
}
