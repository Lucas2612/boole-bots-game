import { Component, OnInit } from '@angular/core';
import { ConfigPanelService } from './config-panel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'boole-bots-game';

  configPanelService: ConfigPanelService;

  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
  }
  ngOnInit(): void {
    this.configPanelService.fetchData();
  }
}
