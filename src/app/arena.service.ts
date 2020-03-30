import { Injectable } from '@angular/core';
import { Direction } from './entity/direction';
import { Observable, of, Subject } from 'rxjs';
import { Bot } from './entity/bot';
import { delay } from 'rxjs/operators';
import { Operation } from './entity/operation';

@Injectable({
  providedIn: 'root'
})
export class ArenaService {

  SIZE_BOT = 50;
  bots: Bot[];
  sendBotSubject = new Subject<Bot>();

  constructor() { }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  runTaskBackground(bots: Bot[]): Observable<Bot[]> {
    this.bots = bots;
    // each x shits, change direction and operation

    // update positions and velocities
    for (let bot of this.bots) {
      //
      // bot.operation = this.getRandomInt(0, 4);
      bot = this.moveBot(bot);
    }

    // trying to explain here
    // loop each item and call detect collision only if index is greater.
    // This is to avoid compare bot1 to bot2 and bot2 to bot 1.
    // detectCollision method returns the index to be removed from the array
    this.bots.forEach((e, indexE) => this.bots.forEach((o, indexO) => indexO > indexE &&
    this.bots.splice(this.detectCollision(e, o), 1) ));
    return of(this.bots).pipe(delay(100));
  }

  private detectCollision(xBot: Bot, zBot: Bot): number {
    // return index to remove or lenght
    // detect collision
    if (  (Math.abs(xBot.position.x - zBot.position.x) < this.SIZE_BOT) &&
          (Math.abs(xBot.position.y - zBot.position.y) < this.SIZE_BOT) ) {
        console.log('Collision: ' + xBot.color + ' >< ' + zBot.color);
        let resultX: boolean;
        let resultZ: boolean;
        // apply rules
        switch (xBot.operation) {
          case (Operation.AND): {
            resultX = (xBot.boolValue && zBot.boolValue);
            break;
          }
          case (Operation.OR): {
            resultX = (xBot.boolValue || zBot.boolValue);
            break;
          }
          case (Operation.XOR): {  // maybe, could be xBot.boolValue !== zBot.boolValue
            resultX = (xBot.boolValue) ? (!zBot.boolValue) : (zBot.boolValue);
            break;
          }
          case (Operation.NOR): { // maybe, could be xBot.boolValue === zBot.boolValue
            resultX = !((xBot.boolValue) || (zBot.boolValue));
            break;
          }
        }
        switch (zBot.operation) {
          case (Operation.AND): {
            resultZ = (zBot.boolValue && xBot.boolValue);
            break;
          }
          case (Operation.OR): {
            resultZ = (zBot.boolValue || xBot.boolValue);
            break;
          }
          case (Operation.XOR): {  // maybe, could be xBot.boolValue === zBot.boolValue
            resultZ = (zBot.boolValue) ? (!xBot.boolValue) : (xBot.boolValue);
            break;
          }
          case (Operation.NOR): {
            resultZ = !((zBot.boolValue || xBot.boolValue));
            break;
          }
        }

        console.log(xBot.color + ': ' + xBot.boolValue + ' ' +
          Operation[xBot.operation] + ' ' + zBot.boolValue + ' = ' + resultX);
        console.log(zBot.color + ' : ' + zBot.boolValue + ' ' +
          Operation[zBot.operation] + ' ' + xBot.boolValue + ' = ' + resultZ);

        if ((resultX) && (!resultZ)) {
          console.log('removing bot ' + zBot);
          return this.bots.indexOf(zBot); }
        if ((resultZ) && (!resultX)) {
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
        const changeDir = xBot.position.x + distance >= 350;
        xBot.position.x = changeDir ? 350 : xBot.position.x + distance;
        xBot.direction = changeDir ? Direction.WEST : xBot.direction;
        break;
      }
      case Direction.WEST: { // WEST
        const changeDir = xBot.position.x - distance <= 0;
        xBot.position.x = changeDir ? 0 : xBot.position.x - distance;
        xBot.direction = changeDir ? Direction.EAST : xBot.direction;
        break;
      }
      case Direction.NORTH: {
        const changeDir = xBot.position.y - distance <= 0;
        xBot.position.y = changeDir ? 0 : xBot.position.y - distance;
        xBot.direction = changeDir ? Direction.SOUTH : xBot.direction;
        break;
      }
      case Direction.SOUTH: { // 2
        const changeDir = xBot.position.y + distance >= 350;
        xBot.position.y = changeDir ? 350 : xBot.position.y + distance;
        xBot.direction = changeDir ? Direction.NORTH : xBot.direction;
        break;
      }
    }
    return xBot;
  }

  getSendBotSubject(): Observable<Bot> {
    return this.sendBotSubject.asObservable();
  }
  sendWinnerBot(bot: Bot) {
    console.log('send winner Bot' + bot);
    this.sendBotSubject.next(bot);
  }
}
