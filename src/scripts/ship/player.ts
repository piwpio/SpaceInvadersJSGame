import { Ship } from "./ship";
import { Observable } from "../observator/observable";
import { KeyboardSubjectValue, DIRECTION } from "../models";
import { BulletSize, PlayerXRange, ShipSize } from "../config";
import { Topic } from "../mediator/topic";
import { PlayerBullet } from "./playerBullet";

export class Player extends Ship implements Observable, Topic {
  keyboardValue: KeyboardSubjectValue = {
    [DIRECTION.LEFT]: false,
    [DIRECTION.RIGHT]: false,
    last: DIRECTION.NONE,
    shoot: false
  };

  mediatorPublish: Function;
  mediatorSubscribe: Function;

  init() {
    this.$element.id = 'player';
  }

  render(): void {
    super.render();
    if (this.bullet) {
      this.bullet.render();
    }
  }

  update(): void {
    if (this.keyboardValue['last'] === DIRECTION.LEFT && this.keyboardValue[DIRECTION.LEFT]) {
      this.position.x = Math.max(this.position.x - this.speed, PlayerXRange.left);
      this.mediatorPublish('user_moved');
    } else if (this.keyboardValue['last'] === DIRECTION.RIGHT && this.keyboardValue[DIRECTION.RIGHT]) {
      this.position.x = Math.min(this.position.x + this.speed, PlayerXRange.right);
      this.mediatorPublish('user_moved');
    }

    if (this.bullet) {
      this.bullet.update();
      if (this.bullet.position.y < -100) {
        this.bullet = null;
      }
    }

    if (this.keyboardValue.shoot && this.bullet === null) {
      this.bullet = new PlayerBullet(
        this.$gameWindow,
        {x: this.position.x + ShipSize.w / 2 - BulletSize.w / 2, y: this.position.y - BulletSize.h},
        {x: this.position.x + ShipSize.w / 2, y: 0}
      )
    }
  }

  onSubjectChange(value: KeyboardSubjectValue): void {
    this.keyboardValue = value;
    this.mediatorPublish('user_moved');
  }
}
