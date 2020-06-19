import { Position } from "../models";
import { Renderable } from "./renderable";

export class Bullet extends Renderable {
  $gameWindow: HTMLElement;
  $element: HTMLElement;
  position: Position;
  targetPosition: Position;
  bulletTrajectory: Position;
  bulletSpeed: number;

  constructor($gameWindow: HTMLElement, startPosition: Position, targetPosition: Position) {
    super();
    this.$gameWindow = $gameWindow;
    this.position = startPosition;
    this.targetPosition = targetPosition;

    this.prepare();
    this.init();
    this.calculateTrajectory();
    this.append();
  }

  private prepare() {
    const $el = document.createElement("div");
    $el.className = `bullet`;
    this.$element = $el;
  }

  private append() {
    this.$gameWindow.appendChild(this.$element);
  }

  private vecMag(vec): number {
    return Math.sqrt( vec.x * vec.x + vec.y * vec.y);
  }

  private vecMul(a: Position, c: number): Position {
    return { x: a.x * c, y: a.y * c };
  }

  private vecDiv(a: Position, c: number): Position {
    return this.vecMul(a, 1.0/c);
  }

  private vecNormalize(a: Position): Position {
    return this.vecDiv(a, this.vecMag(a));
  }

  private calculateTrajectory() {
    const dist = Math.sqrt(
      Math.pow(this.targetPosition.x - this.position.x, 2) + Math.pow(this.targetPosition.y - this.position.y, 2)
    );
    const x = (this.targetPosition.x - this.position.x) / dist;
    const y = (this.targetPosition.y - this.position.y) / dist;
    const normalized = this.vecNormalize({x: x, y: y});
    this.bulletTrajectory = {
      x: normalized.x * this.bulletSpeed,
      y: normalized.y * this.bulletSpeed
    }
  }

  init() {}

  render() {
    this.$element.style.left = `${this.position.x}px`
    this.$element.style.top = `${this.position.y}px`
  }

  update() {
    this.position.x = this.position.x + this.bulletTrajectory.x;
    this.position.y = this.position.y + this.bulletTrajectory.y;
  }
}
