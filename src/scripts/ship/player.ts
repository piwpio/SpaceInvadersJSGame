import { Ship } from "./ship";
import { Observable } from "../observator/observable";
import { KeyboardSubjectValue, DIRECTION } from "../models";
import { PlayerXRange } from "../config";
import { Topic } from "../mediator/topic";

export class Player extends Ship implements Observable, Topic {
  keyboardValue: KeyboardSubjectValue = {
    [DIRECTION.LEFT]: false,
    [DIRECTION.RIGHT]: false,
    last: DIRECTION.NONE
  };

  mediatorPublish: Function;
  mediatorSubscribe: Function;

  render(): void {
    super.render();
  }

  update(): void {
    if (this.keyboardValue['last'] === DIRECTION.LEFT && this.keyboardValue[DIRECTION.LEFT]) {
      this.position.x = Math.max(this.position.x - this.speed, PlayerXRange.left);
    } else if (this.keyboardValue['last'] === DIRECTION.RIGHT && this.keyboardValue[DIRECTION.RIGHT]) {
      this.position.x = Math.min(this.position.x + this.speed, PlayerXRange.right);
    }
  }

  onSubjectChange(value: KeyboardSubjectValue): void {
    this.keyboardValue = value;
  }
}
