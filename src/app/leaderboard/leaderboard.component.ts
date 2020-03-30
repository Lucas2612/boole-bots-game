import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArenaService } from '../arena.service';
import { ConfigPanelService } from '../config-panel.service';
import { Leaderboard } from '../entity/leaderboard';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  arenaService: ArenaService;
  configPanelService: ConfigPanelService;
  subscriptionBotWinner;
  wins: Leaderboard[] = new Array();

  constructor(arenaService: ArenaService, configPanelService: ConfigPanelService) {
    this.arenaService = arenaService;
    this.configPanelService = configPanelService;
  }

  ngOnInit(): void {
    const subscription = this.configPanelService.getSubjectBot().subscribe(
      bots => { bots.forEach(o => this.wins.push(new Leaderboard(o))); }
    );
    subscription.unsubscribe();
    this.arenaService.getSendBotSubject().subscribe(
      bot => {
        this.wins.forEach( (element, index, array) => {
          if (element.bot.id === bot.id) { array[index].wins += 1; }
        });

        this.wins = this.wins.slice();
      }
    );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionBotWinner.unsubscribe();
  }

}
