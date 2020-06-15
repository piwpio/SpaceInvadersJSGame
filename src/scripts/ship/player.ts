import { Ship } from "./ship";
import { Observable } from "../subject/observable";

export class Player extends Ship implements Observable {
  init() {

  }

  onSubjectChange(value: any) {
    console.log(value);
  }
}
