export class Position {
  x: number;
  y: number;

  static generatePosition(sequence: number, factor): Position {
    // the multiply the position to adapt to div size
    const x = Math.floor(sequence / 8) * factor;
    const y = (sequence % 8) * factor;
    return new Position(x, y);
  }

  constructor(x: number, y: number) {
    this.setPosition(x, y);
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}
