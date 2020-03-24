import { Component, OnInit, Input } from '@angular/core';
import { Bot } from '../entity/bot';
import { Direction } from '../entity/direction';
import { ConfigPanelService } from '../config-panel.service';

@Component({
  selector: 'app-bot-panel',
  templateUrl: './bot-panel.component.html',
  styleUrls: ['./bot-panel.component.css']
})
export class BotPanelComponent implements OnInit {

  @Input() bot;
  configPanelService: ConfigPanelService;

  directions = Direction;
  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
   }

  ngOnInit(): void {
  }

  onSubmit(submittedForm) {
    if (submittedForm.invalid) {
      return;
    }
    this.configPanelService.saveBot(this.bot);
  }

}
