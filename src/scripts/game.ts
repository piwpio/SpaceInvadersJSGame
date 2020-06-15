import { Player } from "./ship/player";
import { GameSize, PlayerShipConfig } from "./config";
import { KeyboardSubject } from "./subject/keyboardSubject";

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
  }

  public duck() {
    this.keyboardSubject = new KeyboardSubject();

    this.createMainWindow();
    this.createPlayer();
  }
}
