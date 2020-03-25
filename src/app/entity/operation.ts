export enum Operation {
  AND = 'And', // true and true = true, demais false
  OR = 'Or', // false or false = true, demais false
  XOR = 'Xor', // false and true = true, true and false = true, demais false
  NOT = 'Not' // false and false = true, demais false
}
