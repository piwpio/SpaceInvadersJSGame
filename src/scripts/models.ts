export interface ShipModel {
  $gameWindow: HTMLElement;
  position: Position;
  className: string;
  prepare(): void;
}

export interface Position {
  x: number;
  y: number;
}
