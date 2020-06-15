import { Position, ShipConfig, ShipModel, Size } from "../models";
import { Renderable } from "./renderable";

export abstract class Ship implements ShipModel, Renderable {
  $gameWindow: HTMLElement
  $element: HTMLElement;
  position: Position;
  previousPosition: Position;
  size: Size;
  speed: number;
  background = ''
  className = '';

  constructor($gameWindow: HTMLElement, config: ShipConfig) {
    this.$gameWindow = $gameWindow;
    this.position = {...config.position};
    this.previousPosition = {...config.position};
    this.size = {...config.size};
    this.background = config.background
    this.className = config.className || '';
    this.speed = config.speed;

    this.prepare();
    this.init();
    this.append()
  }

  private prepare(): void {
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

  private append(): void {
    this.$gameWindow.appendChild(this.$element);
  }

  public init(): void {}

  public update(): void {}

  public render(): void {
    if (this.position.y !== this.previousPosition.y) {
      this.$element.style.top = `${this.position.y}px`;
      this.previousPosition.y = this.position.y
    }
    if (this.position.x !== this.previousPosition.x) {
      this.$element.style.left = `${this.position.x}px`;
      this.previousPosition.x = this.position.x;
    }
  }
}
