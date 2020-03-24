import { Component, OnInit } from '@angular/core';
import { ConfigPanelService } from '../config-panel.service';
import { Bot } from '../entity/bot';

@Component({
  selector: 'app-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.css']
})
export class ConfigPanelComponent implements OnInit {

  configPanelService: ConfigPanelService;
  bots: Bot[];

  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
  }

  getBots() {
      this.configPanelService.getBots().subscribe(
      (bots) => {
        this.bots = bots;
        console.log(this.bots);
      }
    );
  }

  ngOnInit(): void {
    this.getBots();
  }

}
