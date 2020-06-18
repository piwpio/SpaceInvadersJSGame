import { Subject } from "./subject";
import { KeyboardSubjectValue, DIRECTION } from "../models";

export class KeyboardSubject extends Subject {

  constructor() {
    super();
    this.value = {
      [DIRECTION.LEFT]: false,
      [DIRECTION.RIGHT]: false,
      last: DIRECTION.NONE
    } as KeyboardSubjectValue;
    this.initEvents();
  }

  private onKeyDown(event: KeyboardEvent): void {
    const value = {...this.value};
    if (event.code === 'ArrowLeft') {
      value[DIRECTION.LEFT] = true;
      value['last'] = DIRECTION.LEFT;
      this.value = value;
    }
    else if (event.code === 'ArrowRight') {
      value[DIRECTION.RIGHT] = true;
      value['last'] = DIRECTION.RIGHT;
      this.value = value;
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    const value = {...this.value};
    if (event.code === 'ArrowLeft') {
      value[DIRECTION.LEFT] = false;
      value['last'] = value[DIRECTION.RIGHT] ? DIRECTION.RIGHT : DIRECTION.NONE;
      this.value = value;
    }
    else if (event.code === 'ArrowRight') {
      value[DIRECTION.RIGHT] = false;
      value['last'] = value[DIRECTION.LEFT] ? DIRECTION.LEFT : DIRECTION.NONE;
      this.value = value;
    }
  }

  private initEvents(): void {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  public removeEvents(): void {
    document.removeEventListener('keydown', this.onKeyDown.bind(this))
    document.removeEventListener('keyup', this.onKeyUp.bind(this))
  }
}
