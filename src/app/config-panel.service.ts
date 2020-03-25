import { Injectable, OnInit } from '@angular/core';
import { Bot } from './entity/bot';
import { Observable } from 'rxjs/internal/Observable';
import { Subject, of, BehaviorSubject } from 'rxjs';
import { Posicao } from './entity/posicao';

@Injectable({
  providedIn: 'root'
})
export class ConfigPanelService {

  botsSubject;
  bots: Bot[];
  private subject = new Subject<any>();
  arena: number[][];

  constructor() {
    this.fetchData();
  }

  fetchData() {
    this.bots = new Array();
    const bot1 = new Bot(1, 'red');
    const bot2 = new Bot(2, 'green');
    const bot3 = new Bot(3, 'yellow');
    const bot4 = new Bot(4, 'white');

    this.bots.push(bot1);
    this.bots.push(bot2);
    this.bots.push(bot3);
    this.bots.push(bot4);

    this.botsSubject = new BehaviorSubject(this.bots);
    this.createArena();
  }

  getSubject(): Subject<Bot[]> {
    return this.botsSubject.asObservable();
  }

  saveBot(bot: Bot) {
    const pos = this.bots.findIndex((char) => {
      return char.id === bot.id;
    });
    // this.bots[pos].name = bot.name;
    this.bots[pos].update(bot);
    this.botsSubject.next(this.bots);

    // atribuir uma posicao, se ainda não foi atribuida.
    if (bot.posicaoInicial.x === -1) {
      function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
    }

  }

  checkNames(bot: Bot) {
    for (const elem of this.bots) {
      if ( (bot.id !== elem.id) &&
      elem.name === bot.name) {
        return true;
      }
    }
  }

  createArena() {
    this.arena = [];
    for (let i = 0; i < 8; i++) {
        this.arena[i] = [];
        for (let j = 0; j < 8; j++) {
            this.arena[i][j] = 0;
        }
    }
  }

  private convertNumberToPosicao(value): Posicao {
    return new Posicao(0, 0);
  }

  private convertPosicaoToNumber(posicao: Posicao): number {
    return 0;
  }

  private posicaoRamdom(): Posicao {

    // remover posicoes que já possuem bots.
    for (const elem of this.bots) {

    }

    return new Posicao(0, 0);
  }

}
