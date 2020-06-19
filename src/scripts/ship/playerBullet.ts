import { Bullet } from "./bullet";
import { Renderable } from "./renderable";
import { PlayerBulletSpeed } from "../config";

export class PlayerBullet extends Bullet implements Renderable {
  init() {
    this.bulletSpeed = PlayerBulletSpeed;
    this.$element.classList.add('player');
  }
}
