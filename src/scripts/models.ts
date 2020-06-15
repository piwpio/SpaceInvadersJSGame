import { Observable } from "./subject/observable";

/** INTERFACES **/

export interface ShipModel {
  $gameWindow: HTMLElement;
  $element: HTMLElement;
  position: Position;
  size: Size;
  className: string;
  background: string;
}

export interface ShipConfig {
  position: Position;
  size: Size;
  background: string;
  className?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface SubjectModel {
  observables: Observable[];
}

/** ENUMERABLE **/

export enum SIDE {
  LEFT = -1,
  NONE,
  RIGHT
}
