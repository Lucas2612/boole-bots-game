import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigPanelService } from '../config-panel.service';
import { Bot } from '../entity/bot';
import { Position } from '../entity/position';
import { Direction } from '../entity/direction';
import { ArenaService } from '../arena.service';
import { Operation } from '../entity/operation';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit, OnDestroy {

  subscriptionBot;
  configPanelService;
  arenaService;
  bots: Bot[] = new Array();
  sequenceArena: number[] = new Array();
  pixelFactor = 50;
  subscriptionGame;
  stop = false;

  constructor(configPanelService: ConfigPanelService,
              arenaService: ArenaService) {
    this.configPanelService = configPanelService;
    this.arenaService = arenaService;
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
      bot.position = this.randomPosition();
      if (bot.boolValue === null) {bot.boolValue = this.randomValue([true, false]); }
      if (bot.speed === null)  { bot.speed = this.getRandomInt(0, 4) + 1; }
      if (bot.direction === null) { bot.direction = this.getRandomInt(0, Object.keys(Direction).filter(e => !isNaN(+e)).length); }
      if (bot.operation === null) { bot.operation = this.getRandomInt(0, Object.keys(Operation).filter(e => !isNaN(+e)).length); }
      console.log(bot);
      this.bots.push(bot);
    }
  }

  private randomValue(array: any[]): any {
    const index = this.getRandomInt(0, array.length);
    return array[index];
  }

  private randomPosition(): Position {
    const index = this.getRandomInt(0, this.sequenceArena.length);
    const pos = this.sequenceArena[index];
    // it removes the position from the sequence
    this.sequenceArena.splice(index, 1);
    return Position.generatePosition(pos, this.pixelFactor);
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private onStartStop(battle: boolean) {
    console.log('Arena onStartStop: ' + battle);
    // battle === false -> try to start
    if (battle === false) {
      if (this.bots.length < 4) { return; }
      this.bots.forEach(element => {
        if (element.name === '') { return; }
      });
      this.configPanelService.sendBattleToGameControl(true);
      this.stop = false;
      this.startBattle(this.bots);
    } else {
      this.configPanelService.sendBattleToGameControl(false);
      this.stop = true;
    }
  }

  private startBattle(bots) {
    this.bots = bots.slice();
    if (this.bots.length > 1 && this.stop === false) {
      // runs in background, when finishes, check condition and runs again
      this.arenaService.runTaskBackground(this.bots).subscribe(
        xBots => this.startBattle(xBots),
        err => console.log(err),
      );
    } else {
      if (this.bots.length === 1) {
        console.log('Bot ' + this.bots[0].color + ' Wins');
        this.bots[0].wins += 1;
        this.arenaService.sendWinnerBot(this.bots[0]);
      }
      this.onStartStop(true);
    }
  }


}
