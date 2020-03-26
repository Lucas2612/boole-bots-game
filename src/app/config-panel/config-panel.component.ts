import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigPanelService } from '../config-panel.service';
import { Bot } from '../entity/bot';

@Component({
  selector: 'app-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.css']
})
export class ConfigPanelComponent implements OnInit, OnDestroy {

  configPanelService: ConfigPanelService;
  bots: Bot[];
  subscription;

  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
  }

  getBots() {
      this.configPanelService.getSubjectBot().subscribe(
      (bots: Bot[]) => {
        this.bots = bots;

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
