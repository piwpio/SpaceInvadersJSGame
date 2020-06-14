import { Player } from "./ship/player";
import { PlayerShipConfig } from "./config";

export class Game {
  private static instance: Game;

  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private constructor() {};

  private player: Player;
  private $gameWindow: HTMLElement;

  private prepareMainWindow() {
    const $mainContainer = document.createElement("div");
    $mainContainer.id = 'main-container';
    const $gameWindow = document.createElement("div")
    $gameWindow.id = 'game-window'

    this.$gameWindow = $gameWindow;

    $mainContainer.appendChild($gameWindow);
    document.body.appendChild($mainContainer);
  }

  private preparePlayer() {
    this.player = new Player(this.$gameWindow, PlayerShipConfig);
  }

  public duck() {
    this.prepareMainWindow();
    this.preparePlayer();
  }
}
