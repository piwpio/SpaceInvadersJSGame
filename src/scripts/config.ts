import { ShipConfig, Size } from "./models";

export const GameSize: Size = {
  w: 800,
  h: 600
}

export const PlayerSize: Size = {
  w: 50,
  h: 50
}

export const PlayerXRange = {
  left: 50,
  right: 50
}

export const PlayerYRange = {
  top: 20,
  bottom: 20
}

export const PlayerShipConfig: ShipConfig = {
  position: { x: (GameSize.w / 2) - (PlayerSize.w / 2), y: GameSize.h - PlayerSize.h - PlayerYRange.bottom },
  size: PlayerSize,
  background: 'url("./images/player.png")',
  className: 'player'
}
