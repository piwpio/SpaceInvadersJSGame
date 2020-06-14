import { Position, ShipConfig, ShipModel, Size } from "../models";

export abstract class Ship implements ShipModel {
  $gameWindow: HTMLElement
  $element: HTMLElement;
  position: Position;
  size: Size;
  background = ''
  className = '';

  constructor($gameWindow: HTMLElement, config: ShipConfig) {
    this.$gameWindow = $gameWindow;
    this.position = config.position;
    this.size = config.size;
    this.background = config.background
    this.className = config.className || '';

    this.prepare();
    this.init();
    this.append()
  }

  private prepare() {
    const $el = document.createElement("div")
    $el.className = `ship`;
    $el.classList.add(this.className);
    $el.style.position = 'absolute';

    $el.style.top = `${this.position.y}px`;
    $el.style.left = `${this.position.x}px`;
    $el.style.width = `${this.size.w}px`;
    $el.style.height = `${this.size.h}px`;
    $el.style.backgroundImage = this.background;
    $el.style.backgroundSize = 'contain';

    this.$element = $el;
  }

  private append() {
    this.$gameWindow.appendChild(this.$element);
  }

  public init() {
    console.log('init ship');
  }
}
