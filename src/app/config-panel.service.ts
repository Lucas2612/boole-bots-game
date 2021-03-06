import { Injectable, OnInit } from '@angular/core';
import { Bot } from './entity/bot';
import { Observable } from 'rxjs/internal/Observable';
import { Subject, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigPanelService {
  private botsSubject: BehaviorSubject<Bot[]>;
  bots: Bot[];
  private arenaSubject;
  private battleArenaSubject = new Subject<boolean>();
  private battleGameControlSubject = new Subject<boolean>();

  constructor() {
    this.fetchData();
  }

  fetchData() {
    this.bots = new Array();
    const bot1 = new Bot(1, 'red', 'BOT 1');
    const bot2 = new Bot(2, 'green', 'BOT 2');
    const bot3 = new Bot(3, 'yellow', 'BOT 3');
    const bot4 = new Bot(4, 'white', 'BOT 4');

    this.bots.push(bot1);
    this.bots.push(bot2);
    this.bots.push(bot3);
    this.bots.push(bot4);

    this.botsSubject = new BehaviorSubject<Bot[]>(this.bots);
    this.arenaSubject = new Subject<Bot>();
  }

  getSubjectBot(): Observable<Bot[]> {
    return this.botsSubject.asObservable();
  }

  getSubjectArena(): Observable<Bot> {
    return this.arenaSubject.asObservable();
  }

  getArenaBattleSubject(): Observable<boolean> {
    return this.battleArenaSubject.asObservable();
  }

  sendBattleArenaSubject(battle: boolean) {
    this.battleArenaSubject.next(battle);
  }

  getGameControlSubject(): Observable<boolean> {
    return this.battleGameControlSubject.asObservable();
  }

  saveBot(bot: Bot) {
    const pos = this.bots.findIndex((char) => {
      return char.id === bot.id;
    });
    // this.bots[pos].name = bot.name;
    this.bots[pos].update(bot);
    // console.log(this.bots[pos].direction);
    this.botsSubject.next(this.bots);

    // send bot to arena, the arena sets a initial position randomically
    this.arenaSubject.next(bot);

  }

  checkNames(bot: Bot) {
    for (const elem of this.bots) {
      if ( (bot.id !== elem.id) &&
      elem.name === bot.name) {
        return true;
      }
    }
  }

  sendBattleToGameControl(battle: boolean) {
    this.battleGameControlSubject.next(battle);
  }

}
