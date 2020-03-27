import { Injectable } from '@angular/core';
import { Direction } from './entity/direction';
import { Observable, of } from 'rxjs';
import { Bot } from './entity/bot';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArenaService {

  constructor() { }

  runTaskBackground(bots: Bot[]): Observable<Bot[]> {
    for (const bot of bots) {
      // apply force
      const distance = bot.speed * 10;

      // update positions and velocities
      switch (bot.direction) {
        case Direction.EAST: {
          const changeDir = bot.posicao.x + distance >= 350;
          bot.posicao.x = changeDir ? 350 : bot.posicao.x + distance;
          bot.direction = changeDir ? Direction.WEST : bot.direction;
          break;
        }
        case Direction.WEST: {
          const changeDir = bot.posicao.x - distance <= 0;
          bot.posicao.x = changeDir ? 0 : bot.posicao.x - distance;
          bot.direction = changeDir ? Direction.EAST : bot.direction;
          break;
        }
        case Direction.NORTH: {
          const changeDir = bot.posicao.y - distance <= 0;
          bot.posicao.y = changeDir ? 0 : bot.posicao.y - distance;
          bot.direction = changeDir ? Direction.SOUTH : bot.direction;
          break;
        }
        case Direction.SOUTH: {
          const changeDir = bot.posicao.y + distance >= 350;
          bot.posicao.y = changeDir ? 350 : bot.posicao.y + distance;
          bot.direction = changeDir ? Direction.NORTH : bot.direction;
          break;
        }
      }
    }
    return of(bots).pipe(delay(2000));
  }
}
