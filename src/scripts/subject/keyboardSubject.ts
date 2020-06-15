import { Subject } from "./subject";
import { KeyboardSubjectValue, SIDE } from "../models";

export class KeyboardSubject extends Subject {

  constructor() {
    super();
    this.value = {
      [SIDE.LEFT]: false,
      [SIDE.RIGHT]: false,
      last: SIDE.NONE
    } as KeyboardSubjectValue;
    this.initEvents();
  }

  private onKeyDown(event: KeyboardEvent): void {
    const value = {...this.value};
    if (event.code === 'ArrowLeft') {
      value[SIDE.LEFT] = true;
      value['last'] = SIDE.LEFT;
      this.value = value;
    }
    else if (event.code === 'ArrowRight') {
      value[SIDE.RIGHT] = true;
      value['last'] = SIDE.RIGHT;
      this.value = value;
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    const value = {...this.value};
    if (event.code === 'ArrowLeft') {
      value[SIDE.LEFT] = false;
      value['last'] = value[SIDE.RIGHT] ? SIDE.RIGHT : SIDE.NONE;
      this.value = value;
    }
    else if (event.code === 'ArrowRight') {
      value[SIDE.RIGHT] = false;
      value['last'] = value[SIDE.LEFT] ? SIDE.LEFT : SIDE.NONE;
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
