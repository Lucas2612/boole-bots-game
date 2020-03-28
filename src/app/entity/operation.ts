export enum Operation {
  AND = 0, // true and true = true, demais false
  OR = 1, // false or false = true, demais false
  XOR = 2, // false and true = true, true and false = true, demais false
  NOR = 3 // false and false = true, demais false
}
