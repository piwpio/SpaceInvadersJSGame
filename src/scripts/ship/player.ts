import { Ship } from "./ship";
import { Observable } from "../subject/observable";
import { KeyboardSubjectValue, SIDE } from "../models";
import { PlayerXRange } from "../config";

export class Player extends Ship implements Observable {
  keyboardValue: KeyboardSubjectValue = {
    [SIDE.LEFT]: false,
    [SIDE.RIGHT]: false,
    last: SIDE.NONE
  };

  render() {
    super.render();
  }

  update(): void {
    if (this.keyboardValue['last'] === SIDE.LEFT && this.keyboardValue[SIDE.LEFT]) {
      this.position.x = Math.max(this.position.x - this.speed, PlayerXRange.left);
    } else if (this.keyboardValue['last'] === SIDE.RIGHT && this.keyboardValue[SIDE.RIGHT]) {
      this.position.x = Math.min(this.position.x + this.speed, PlayerXRange.right);
    }
  }

  onSubjectChange(value: KeyboardSubjectValue): void {
    this.keyboardValue = value;
  }
}
