import { Player } from "./ship/player";
import { PlayerShipConfig } from "./config";

export class Game {
  private static instance: Game;

  private $gameWindow = document.getElementById('game-window');
  private player: Player;

  private constructor() {
  };

  public static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  public duck() {
    this.preparePlayer();
  }

  preparePlayer() {
    this.player = new Player(this.$gameWindow, PlayerShipConfig);
  }
}
