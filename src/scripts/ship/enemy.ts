import { Ship } from "./ship";
import { Topic } from "../mediator/topic";
import { DIRECTION, Position, ShipConfig } from "../models";
import { EnemyXRange } from "../config";

export class Enemy extends Ship implements Topic {
  mediatorPublish: Function;
  mediatorSubscribe: ();

  private direction: DIRECTION;
  private previousDirection: DIRECTION;
  private down = 0;
  private userPosition: Position

  constructor($gameWindow: HTMLElement, config: ShipConfig, direction: DIRECTION) {
    super($gameWindow, config);
    this.direction = direction;
  }

  render(): void {
    super.render();
  }

  update(): void {
    if (this.direction === DIRECTION.RIGHT && this.position.x >= EnemyXRange.right) {
      this.previousDirection = DIRECTION.RIGHT;
      this.direction = DIRECTION.DOWN;
    } else if (this.direction === DIRECTION.LEFT && this.position.x <= EnemyXRange.left) {
      this.previousDirection = DIRECTION.LEFT;
      this.direction = DIRECTION.DOWN;
    } else if (this.direction === DIRECTION.DOWN && this.down >= 100) {
      this.direction = this.previousDirection === DIRECTION.RIGHT ? DIRECTION.LEFT : DIRECTION.RIGHT;
      this.down = 0;
    } else if (this.direction === DIRECTION.DOWN) {
      this.down = this.down + this.speed;
    }

    switch (this.direction) {
      case DIRECTION.RIGHT:
        this.position.x = this.position.x + this.speed;
        break;
      case DIRECTION.LEFT:
        this.position.x = this.position.x - this.speed;
        break;
      case DIRECTION.UP:
        this.position.y = this.position.y - this.speed;
        break;
      case DIRECTION.DOWN:
        this.position.y = this.position.y + this.speed;
        break;
    }
  }

  updateUserPosition(): void {
    console.log('updateing user position');
    this.userPosition = null;
  }
}
