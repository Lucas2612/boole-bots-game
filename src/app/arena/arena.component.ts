import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigPanelService } from '../config-panel.service';
import { Bot } from '../entity/bot';
import { Posicao } from '../entity/posicao';
import { Direction } from '../entity/direction';
import { ArenaService } from '../arena.service';
import { Operation } from '../entity/operation';
import { EnumToArrayPipe } from '../enumtoarray.pipe';

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
      bot.posicao = this.randomPosition();
      if (bot.boolValue === null) {bot.boolValue = this.randomValue([true, false]); }
      if (bot.speed === null)  { bot.speed = this.randomValue([1, 2, 3, 4, 5]); }
      if (bot.direction === null) { bot.direction = this.randomValueEnum(Object.keys(Direction).filter(e => !isNaN(+e))); }
      if (bot.operation === null) { bot.operation = this.randomValueEnum(Object.keys(Operation).filter(e => !isNaN(+e))); }
      console.log(bot);
      this.bots.push(bot);
    }
  }

  private randomValueEnum(array: any[]): any {
    return this.getRandomInt(0, array.length);
  }

  private randomValue(array: any[]): any {
    const index = this.getRandomInt(0, array.length);
    return array[index];
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
      this.startBattle(this.bots);
    } else {
      this.stop = true;
      this.configPanelService.sendBattleToGameControl(false);
    }
  }

  private startBattle(bots) {
    this.bots = bots.slice();
    if (this.bots.length > 1 && this.stop === false) {
      this.arenaService.runTaskBackground(this.bots).subscribe(
        xBots => this.startBattle(xBots),
        err => console.log(err),
      );
      // solve constraints

      // display results
    }
  }


}
