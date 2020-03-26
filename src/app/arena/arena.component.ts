import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigPanelService } from '../config-panel.service';
import { Bot } from '../entity/bot';
import { Posicao } from '../entity/posicao';
import { interval, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Direction } from '../entity/direction';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit, OnDestroy {

  subscriptionBot;
  configPanelService;
  bots: Bot[] = new Array();
  sequenceArena: number[] = new Array();
  pixelFactor = 50;
  subscriptionGame;
  stop = false;

  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
  }

  ngOnInit(): void {
    this.subscriptionBot = this.configPanelService.getSubjectArena().subscribe(
      bot =>  this.receiveBot(bot)
    );

    this.subscriptionGame = this.configPanelService.getArenaBattleSubject().subscribe(
      battle =>  this.onStartStop(battle)
    );

    for (let i = 0; i < 64; i++) {
      this.sequenceArena.push(i);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionBot.unsubscribe();
    this.subscriptionGame.unsubscribe();
  }

  receiveBot(bot: Bot) {
    // check is bot exists
    const pos = this.bots.findIndex((elem) => {
      return elem.id === bot.id;
    });

    // if doesn't exist, push in the array and set ramdom position
    if (pos === -1) {
      bot.posicao = this.randomPosition();
      console.log(bot.posicao);
      this.bots.push(bot);
    }
  }

  private randomPosition(): Posicao {
    const index = this.getRandomInt(0, this.sequenceArena.length);
    const pos = this.sequenceArena[index];
    // retira a posicao da sequence
    this.sequenceArena.splice(index, 1);
    return Posicao.generatePosicao(pos, this.pixelFactor);
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private onStartStop(battle: boolean) {
    // battle === false -> try to start
    console.log('arena onStartStop' +  ' battle:' + battle);
    if (battle === false) {
      console.log(this.bots.length);
      if (this.bots.length < 4) { return; }
      this.bots.forEach(element => {
        if (element.name === '') { return; }
      });
      this.configPanelService.sendBattleToGameControl(true);
      this.startBattle();
    } else {
      this.stop = true;
      this.configPanelService.sendBattleToGameControl(false);
    }
  }

  runTaskBackground(): Observable<boolean> {
    // apply force
    for (const bot of this.bots) {
      const distance = bot.speed * 10;
      switch (bot.direction) {
        case Direction.EAST: {
          if (bot.posicao.x + distance >= 350) {
            bot.posicao.x = 350;
            bot.direction = Direction.WEST;
          } else {
            bot.posicao.x = bot.posicao.x + distance;
          }
          break;
        }
        case Direction.WEST: {
          bot.posicao.x = bot.posicao.x - distance;
          break;
        }
        case Direction.NORTH: {
          bot.posicao.y = bot.posicao.y - distance;
          break;
        }
        case Direction.SOUTH: {
          bot.posicao.y = bot.posicao.y +  distance;
          break;
        }
        default: {

        }
      }
    }
    console.log(new Date());
    return of(true).pipe(delay(2000));
  }

  private startBattle() {

    if (this.bots.length > 1 && this.stop === false) {
      this.runTaskBackground().subscribe(
        x => this.startBattle(),
        err => console.log(err),
        () => console.log('completion')
      );

      // update positions and velocities

      // detect colisions

      // solve constraints

      // display results
    }
  }


}
