import { Position, ShipConfig, Size } from "./models";

export const GameRefreshRate = 60;

export const GameSize: Size = {
  w: 800,
  h: 600
}

export const ShipSize: Size = {
  w: 50,
  h: 50
}

/***** PLAYER SHIP *****/

export const PlayerXRange = {
  left: 50,
  right: GameSize.w - ShipSize.w - 50
}

export const PlayerYRange = {
  top: 50,
  bottom: GameSize.h - ShipSize.w - 50
}

export const PlayerShipConfig: ShipConfig = {
  position: { x: (GameSize.w / 2) - (ShipSize.w / 2), y: PlayerYRange.bottom },
  size: ShipSize,
  speed: 5,
  background: 'url("./images/player.png")',
  className: 'player'
}

/***** ENEMY SHIP *****/

export const EnemyXRange = {
  left: 25,
  right: GameSize.w - ShipSize.w - 25
}

export const EnemyYRange = {
  top: 50,
  bottom: GameSize.h - ShipSize.w - 50
}

export const EnemyShipConfig: ShipConfig = {
  position: { x: -100, y: -100 },
  size: ShipSize,
  speed: 1,
  background: 'url("./images/enemy.png")',
  className: 'enemy'
}

export const EnemiesPosition: Position[] = [
  {x: 25, y: 50},
  {x: 125, y: 50},
  {x: 225, y: 50},
  {x: 325, y: 50},
  {x: 425, y: 50},
  {x: 525, y: 50},
  {x: 625, y: 50},
  {x: 725, y: 50},
  {x: 25, y: 150},
  {x: 125, y: 150},
  {x: 225, y: 150},
  {x: 325, y: 150},
  {x: 425, y: 150},
  {x: 525, y: 150},
  {x: 625, y: 150},
  {x: 725, y: 150}
]
