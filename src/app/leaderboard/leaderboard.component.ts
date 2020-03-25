import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigPanelService } from '../config-panel.service';
import { Bot } from '../entity/bot';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  configPanelService: ConfigPanelService;
  bots: Bot[];
  subscription;

  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
   }

  getBots() {
    this.subscription = this.configPanelService.getSubject().subscribe(
    (bots) => {
      this.bots = bots.slice();
      }
    );
  }

  ngOnInit(): void {
    this.getBots();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
