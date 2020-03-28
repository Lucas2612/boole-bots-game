import { Component, OnInit, Input, SimpleChanges, OnChanges, Pipe, PipeTransform } from '@angular/core';
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

  @Input() bot: Bot;
  configPanelService: ConfigPanelService;
  nomesIguais = false;
  directions = Direction;
  operations = Operation;
  changeLog: any;

  constructor(configPanelService: ConfigPanelService) {
    this.configPanelService = configPanelService;
   }

  ngOnInit(): void {

  }

  onSubmit(submittedForm) {
    if (submittedForm.invalid || this.nomesIguais) {
      return;
    }
    // this.bot.direction = Direction[Direction[this.dirVal]];
    this.configPanelService.saveBot(this.bot);
   //  this.configPanelService.sendMessage('Message from Home Component to App Component!');
  }

  onChange() {
    this.nomesIguais = false;
    this.nomesIguais = this.configPanelService.checkNames(this.bot);
  }



}
