import { Observable } from "./observator/observable";
import { Bullet } from "./ship/bullet";

/** INTERFACES **/

export interface ShipModel {
  $gameWindow: HTMLElement;
  $element: HTMLElement;
  position: Position;
  size: Size;
  speed: number;
  className: string;
  background: string;
  bullet: Bullet
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
  last: DIRECTION,
  shoot: boolean;
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

export enum ENDGAME {
  WIN,
  LOST
}
