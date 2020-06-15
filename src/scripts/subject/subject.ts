import { SubjectModel } from "../models";
import { Observable } from "./observable";
import * as _ from 'lodash';

export class Subject implements SubjectModel {
  private _value: any;
  public previousValue: any;
  observables: Observable[] = [];

  set value(value: any) {
    this.previousValue = {...this._value};
    this._value = value;

    if (!_.isEqual(this._value, this.previousValue)) {
      this.notify();
    }
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
