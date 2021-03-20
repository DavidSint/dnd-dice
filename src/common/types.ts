export interface IRoll {
  id: string;
  value: number;
  d: number;
}
export interface ISavedRoll {
  id: string;
  name: string;
  mod: number;
  dice: number[];
}
export interface IPlannedDie {
  d: number,
  count: number
}
export interface IRecievedRoll {
  game: string,
  name: string,
  roll: IRoll[],
  mod: number,
  total: number
}