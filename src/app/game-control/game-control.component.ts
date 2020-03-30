import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigPanelService } from '../config-panel.service';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit, OnDestroy {

  startStop = 'Battle!';
  battle = false;
  configPanelService: ConfigPanelService;
  subscription;

  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
  }

  ngOnInit(): void {
    this.subscription = this.configPanelService.getGameControlSubject().subscribe(
      battle => this.changeBattle(battle)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onStartStop() {
    console.log('onStartStop ' + this.battle);
    this.configPanelService.sendBattleArenaSubject(this.battle);
  }

  changeBattle(battle) {
    console.log('changeBattle ' + battle);
    this.battle = battle;
    this.startStop = battle === true ? 'Stop!' : 'Battle!';
  }

}
