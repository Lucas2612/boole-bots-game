import { Bot } from './bot';

export class Leaderboard {
  bot: Bot;
  wins: number;

  constructor(bot: Bot) {
    this.bot = bot;
    this.wins = 0;
  }

  toString() {
    return 'Bot: ' + this.bot.color + ' wins: ' + this.wins;
  }
}

