export class Posicao {
  x: number;
  y: number;

  static generatePosicao(sequence: number, factor): Posicao {
    // the multiply the position to adapt to div size
    const x = Math.floor(sequence / 8) * factor;
    const y = (sequence % 8) * factor;
    return new Posicao(x, y);
  }

  constructor(x: number, y: number) {
    this.setPosicao(x, y);
  }

  setPosicao(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}
