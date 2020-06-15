import { SubjectModel } from "../models";
import { Observable } from "./observable";

export class Subject implements SubjectModel {
  private _value: any;
  private previousValue: any;
  observables: Observable[] = [];

  set value(value: any) {
    this.previousValue = this._value;
    this._value = value;

    if (this._value !== this.previousValue)
      this.notify();
  }

  get value(): any {
    return this._value;
  }

  private notify() {
    this.observables.forEach(observer => {
      observer.onSubjectChange(this._value);
    });
  }

  addObserver(observer: Observable) {
    this.observables.push(observer);
  }

  removeObserver(observer: Observable) {
    this.observables = this.observables.filter(o => o !== observer);
  }
}
