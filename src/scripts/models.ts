import { Observable } from "./observator/observable";

/** INTERFACES **/

export interface ShipModel {
  $gameWindow: HTMLElement;
  $element: HTMLElement;
  position: Position;
  size: Size;
  speed: number;
  className: string;
  background: string;
}

export interface ShipConfig {
  position: Position;
  size: Size;
  background: string;
  speed: number;
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

export interface KeyboardSubjectValue {
 [DIRECTION.LEFT]: boolean;
 [DIRECTION.RIGHT]: boolean;
 last: DIRECTION
}

export interface MediatorTopics {
  [topic: string]: {
    context: any;
    callback: Function}[]
}

/** ENUMERABLE **/

export enum DIRECTION {
  NONE,
  LEFT ,
  RIGHT,
  UP,
  DOWN,
}
