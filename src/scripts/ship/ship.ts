import { Position, ShipModel } from "../models";

export class Ship implements ShipModel {
  $gameWindow: HTMLElement
  $element: HTMLElement;
  position: Position;
  className = '';

  constructor($gameWindow: HTMLElement, position: Position) {
    this.$gameWindow = $gameWindow;
    this.position = position;
    this.prepare();
  }

  prepare() {
    const $el = document.createElement("div")
    $el.className = 'ship';
    $el.className = this.className;
    $el.style.position = 'absolute';
    $el.style.top = `${this.position.y}px`;
    $el.style.left = `${this.position.x}px`

    this.$element = $el;
    this.$gameWindow.appendChild($el);
  }
}
