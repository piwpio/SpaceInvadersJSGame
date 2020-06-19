import { Ship } from "./ship";
import { Topic } from "../mediator/topic";
import { DIRECTION, Position, ShipConfig } from "../models";
import { EnemyShootMinDelaySeconds, EnemyShootFrequencyRandom, EnemyXRange, ShipSize, BulletSize } from "../config";
import { Bullet } from "./bullet";
import { EnemyBullet } from "./enemyBullet";

export class Enemy extends Ship implements Topic {
  mediatorPublish: Function;
  mediatorSubscribe: Function;

  private direction: DIRECTION;
  private previousDirection: DIRECTION;
  private down = 0;
  private userPosition: Position = {x: 0, y: 0};

  private lastShootTs = Date.now();
  private nextShootSec = this.getNextShootSec();

  constructor($gameWindow: HTMLElement, config: ShipConfig, direction: DIRECTION) {
    super($gameWindow, config);
    this.direction = direction;
  }

  private getNextShootSec(): number {
    return Math.floor(Math.random() * EnemyShootFrequencyRandom + EnemyShootMinDelaySeconds);
  }

  render(): void {
    super.render();
    if (this.bullet) {
      this.bullet.render();
    }
  }

  update(): void {
    // Update position
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

    //update bullet
    if (this.bullet) {
      this.bullet.update();
      if (this.bullet.position.y > 610) {
        this.bullet = null;
      }
    }

    // shoot
    if (
      this.bullet === null
      && Date.now() > this.lastShootTs + (this.nextShootSec * 1000)
    ) {
      this.nextShootSec = this.getNextShootSec();
      this.lastShootTs = Date.now();
      this.bullet = new EnemyBullet(
        this.$gameWindow,
        {x: this.position.x + ShipSize.w / 2 - BulletSize.w / 2, y: this.position.y + ShipSize.h},
        {x: this.userPosition.x + ShipSize.w / 2, y: this.userPosition.y + ShipSize.h / 2});
    }
  }

  updateUserPosition(): void {
    const user = document.getElementById('player');
    this.userPosition.x = parseInt(user.style.left);
    this.userPosition.y = parseInt(user.style.top);
  }
}
