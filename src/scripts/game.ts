import { Player } from "./ship/player";
import {
  BulletSize,
  EnemiesPosition,
  EnemyShipConfig,
  GameRefreshRate,
  GameSize,
  PlayerShipConfig,
  ShipSize
} from "./config";
import { KeyboardSubject } from "./observator/keyboardSubject";
import { Mediator } from "./mediator/mediator";
import { Enemy } from "./ship/enemy";
import { DIRECTION, ENDGAME, Position, Size } from "./models";

export class Game {
  private static instance: Game;

  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private constructor() {};

  private $gameWindow: HTMLElement;
  private $endgameResults: HTMLElement;
  private player: Player;
  private keyboardSubject: KeyboardSubject;

  private enemies: Enemy[] = [];

  // Main loop variables
  private intervalId: number;
  private tickLength: number = Math.floor(1000 / GameRefreshRate);
  private lastTick: number;
  private lastRender: number;

  private createMainWindow() {
    const $mainContainer = document.createElement("div");
    $mainContainer.id = 'main-container';
    $mainContainer.style.backgroundImage = 'url("./images/background.png")'

    const $gameWindow = document.createElement("div")
    $gameWindow.id = 'game-window'
    $gameWindow.style.width = `${GameSize.w}px`;
    $gameWindow.style.height = `${GameSize.h}px`;

    this.$gameWindow = $gameWindow;

    $mainContainer.appendChild($gameWindow);
    document.body.appendChild($mainContainer);
  }

  private createEndgameText() {
    const $endgameResults = document.createElement("div")
    $endgameResults.id = 'endgame-results'
    $endgameResults.style.display = `none`;

    this.$gameWindow.appendChild($endgameResults);
    this.$endgameResults = $endgameResults;
  }

  private createPlayer() {
    this.player = new Player(this.$gameWindow, PlayerShipConfig);
    this.keyboardSubject.addObserver(this.player);
    Mediator.bindTo(this.player);
  }

  private createEnemies() {
    let direction: DIRECTION = DIRECTION.LEFT;
    for (let i = 0; i < EnemiesPosition.length; i++) {
      if (i % 8 === 0) {
        direction = direction === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT;
      }
      const enemy = new Enemy(this.$gameWindow, EnemyShipConfig, direction);
      enemy.setPosition(EnemiesPosition[i].x, EnemiesPosition[i].y);
      Mediator.bindTo(enemy);
      enemy.mediatorSubscribe('user_moved', enemy.updateUserPosition);
      this.enemies.push(enemy);
    }
  }

  private schedule(tFrame: number): void {
    this.intervalId = requestAnimationFrame(this.schedule.bind(this));
    let nextTick = this.lastTick + this.tickLength;
    let updateTimes = 0;

    if (tFrame > nextTick) {
      const timeSinceTick = tFrame - this.lastTick;
      updateTimes = Math.floor( timeSinceTick / this.tickLength );
    }

    this.updateTimes(updateTimes);
    this.render();
    this.lastRender = tFrame;
  }

  checkCollision() {
    // bullet collision check
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i]

      // player bullet to enemy position
      if (this.player.bullet) {
        const isCollidingP2E = this.isCollision(
          enemy.position,
          ShipSize,
          this.player.bullet.position,
          BulletSize
        );
        if (isCollidingP2E) {
          enemy.destroy();
          this.player.bullet.destroy();
          this.player.bullet = null;
          this.enemies = this.enemies.filter(e => e !== enemy)
          if (!this.enemies.length) {
            this.endGame(ENDGAME.WIN)
          }
        }
      }

      // enemy bullet to player position
      if (enemy.bullet) {
        const isCollidingE2P = this.isCollision(
          this.player.position,
          ShipSize,
          enemy.bullet.position,
          BulletSize
        );
        if (isCollidingE2P) {
          this.endGame(ENDGAME.LOST)
        }
      }

      // enemy position to player position
      const isCollidingEP2P = this.isCollision(
        this.player.position,
        ShipSize,
        enemy.position,
        {w: ShipSize.w, h: ShipSize.h * 2}
      );
      if (isCollidingEP2P) {
        this.endGame(ENDGAME.LOST);
      }
    }
  }

  private isCollision(aPosition: Position, aSize: Size, bPosition: Position, bSize: Size): boolean {
    return aPosition.x < bPosition.x + bSize.w / 2
      && aPosition.x + aSize.w > bPosition.x + bSize.w / 2
      && aPosition.y < bPosition.y + bSize.h / 2
      && aPosition.y + aSize.h > bPosition.y + bSize.h / 2;
  }

  private updateTimes(updateTimes: number): void {
    for (let i = 0; i < updateTimes; i++) {
      this.lastTick = this.lastTick + this.tickLength;
      this.update();
      this.checkCollision();
    }
  }

  private update() {
    this.player.update();
    this.enemies.forEach(enemy => {
      enemy.update();
    })
  }

  private render() {
    this.player.render();
    this.enemies.forEach(enemy => {
      enemy.render();
    })
  }

  private endGame(status: ENDGAME) {
    // clear main interval
    cancelAnimationFrame(this.intervalId);

    // clear observer
    this.keyboardSubject.removeObserver(this.player);
    this.keyboardSubject.removeEvents();

    //clear mediator
    Mediator.clear();

    // clear ships
    this.player.destroy();
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.destroy()
    }
    this.enemies = [];

    this.$endgameResults.style.display = 'block';
    if (status === ENDGAME.WIN) {
      this.$endgameResults.innerText = '!!! Wygrałeś !!!'
    } else {
      this.$endgameResults.innerText = '!!! Przegrałeś !!!'
    }
  }

  public duck() {
    // Init main observable/subject
    this.keyboardSubject = new KeyboardSubject();

    // init render and update variables
    this.lastTick = performance.now();
    this.lastRender = this.lastTick;

    // create components
    this.createMainWindow();
    this.createPlayer();
    this.createEnemies();
    this.player.mediatorPublish('user_moved');

    this.createEndgameText();

    // start main loop
    this.schedule(performance.now());
  }
}
