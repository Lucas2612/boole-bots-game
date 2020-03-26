import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Bot } from '../entity/bot';
import { Direction } from '../entity/direction';
import { ConfigPanelService } from '../config-panel.service';
import { Operation } from '../entity/operation';

@Component({
  selector: 'app-bot-panel',
  templateUrl: './bot-panel.component.html',
  styleUrls: ['./bot-panel.component.css']
})
export class BotPanelComponent implements OnInit {

  @Input() bot;
  configPanelService: ConfigPanelService;
  nomesIguais = false;
  directions = Direction;
  directionOptions = [];
  operations = Operation;
  changeLog: any;
  keys = Object.keys;

  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
   }

  ngOnInit(): void {
    // this.directionOptions = Object.keys(this.directions);
  }

  onSubmit(submittedForm) {
    if (submittedForm.invalid || this.nomesIguais) {
      return;
    }
    this.configPanelService.saveBot(this.bot);
   //  this.configPanelService.sendMessage('Message from Home Component to App Component!');
  }

  onChange() {
    this.nomesIguais = false;
    this.nomesIguais = this.configPanelService.checkNames(this.bot);
  }



}
