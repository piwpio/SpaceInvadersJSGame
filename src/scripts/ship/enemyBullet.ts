import { Renderable } from "./renderable";
import { Bullet } from "./bullet";
import { EnemyBulletSpeed } from "../config";

export class EnemyBullet extends Bullet implements Renderable {
  init() {
    this.bulletSpeed = EnemyBulletSpeed;
    this.$element.classList.add('enemy');
  }
}
