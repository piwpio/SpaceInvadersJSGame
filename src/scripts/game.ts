import { Player } from "./ship/player";
import { EnemiesPosition, EnemyShipConfig, GameRefreshRate, GameSize, PlayerShipConfig } from "./config";
import { KeyboardSubject } from "./observator/keyboardSubject";
import { Mediator } from "./mediator/mediator";
import { Enemy } from "./ship/enemy";
import { DIRECTION } from "./models";

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
  private player: Player;
  private keyboardSubject: KeyboardSubject;
  private mediator: Mediator;

  private enemies: Enemy[] = [];

  // Main loop variables
  private intervalId: number;
  private tickLength: number = Math.floor(1000 / GameRefreshRate);
  private lastTick: number;
  private lastRender: number;

  private createMainWindow() {
    const $mainContainer = document.createElement("div");
    $mainContainer.id = 'main-container';
    const $gameWindow = document.createElement("div")
    $gameWindow.id = 'game-window'
    $gameWindow.style.width = `${GameSize.w}px`;
    $gameWindow.style.height = `${GameSize.h}px`;

    this.$gameWindow = $gameWindow;

    $mainContainer.appendChild($gameWindow);
    document.body.appendChild($mainContainer);
  }

  private createPlayer() {
    this.player = new Player(this.$gameWindow, PlayerShipConfig);
    this.keyboardSubject.addObserver(this.player);
    this.mediator.bindTo(this.player);
  }

  private createEnemies() {
    for (let i = 0; i < EnemiesPosition.length; i++) {
      const enemy = new Enemy(this.$gameWindow, EnemyShipConfig, i < 8 ? DIRECTION.RIGHT : DIRECTION.LEFT);
      enemy.setPosition(EnemiesPosition[i].x, EnemiesPosition[i].y);
      this.mediator.bindTo(enemy);
      enemy.mediatorSubscribe('user_moved', enemy.updateUserPosition)
      this.enemies.push(enemy)
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

  private updateTimes(updateTimes: number): void {
    for (let i = 0; i < updateTimes; i++) {
      this.lastTick = this.lastTick + this.tickLength;
      this.update();
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

  public duck() {
    // Init main observable/subject
    this.keyboardSubject = new KeyboardSubject();

    // Init main mediator
    this.mediator = new Mediator();

    // init render and update variables
    this.lastTick = performance.now();
    this.lastRender = this.lastTick;

    // create components
    this.createMainWindow();
    this.createPlayer();
    this.createEnemies();
    this.player.mediatorPublish('user_moved');

    // start main loop
    this.schedule(performance.now());
  }
}
