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

export interface IDiceTotalProps {
  rolls: IRoll[],
  mod: number
}

export interface IDiceItemProps {
  die: number;
  roller(die: number[]): void;
}

export interface IDiceRollProps {
  rolls: IRoll[];
  removeADie(id: string): void;
}
