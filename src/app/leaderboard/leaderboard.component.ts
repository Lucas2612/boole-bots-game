import { Component, OnInit } from '@angular/core';
import { ConfigPanelService } from '../config-panel.service';
import { Bot } from '../entity/bot';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  bots: Bot[];
  configPanelService: ConfigPanelService;

  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
   }

  ngOnInit(): void {
    this.configPanelService.botsSubject.subscribe(
      bots => {
        this.bots = bots;
      }
    );
  }

}
