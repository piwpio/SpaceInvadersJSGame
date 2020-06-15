import { Subject } from "./subject";
import { SIDE } from "../models";

export class KeyboardSubject extends Subject {

  constructor() {
    super();
    this.initEvents();
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'ArrowLeft') this.value = SIDE.LEFT;
    else if (event.code === 'ArrowRight') this.value = SIDE.RIGHT;
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.value = SIDE.NONE;
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
