import { Injectable, OnInit } from '@angular/core';
import { Bot } from './entity/bot';
import { Observable } from 'rxjs/internal/Observable';
import { Subject, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigPanelService {

  botsSubject;
  bots;

  constructor() { }

  fetchData() {
    this.bots = new Array();
    const bot1 = new Bot(1);
    const bot2 = new Bot(2);
    const bot3 = new Bot(3);
    const bot4 = new Bot(4);

    this.bots.push(bot1);
    this.bots.push(bot2);
    this.bots.push(bot3);
    this.bots.push(bot4);
  }
  getBots() {
    console.log(this.bots);
    this.botsSubject = new BehaviorSubject(this.bots);
    return this.botsSubject.asObservable();
  }

  saveBot(bot: Bot) {
    const pos = this.bots.findIndex((char) => {
      return char.id === bot.id;
    });
    this.bots[pos] = bot;
    this.botsSubject.next(this.bots);
  }


}
