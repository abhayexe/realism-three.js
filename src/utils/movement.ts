import { Vector3 } from 'three';

export const MOVEMENT = {
  SPEED: 1,
  SPRINT_MULTIPLIER: 2,
  JUMP_FORCE: 8,
  GRAVITY: -20,
  PLAYER_HEIGHT: 1.3, // Average human height in meters
  BOB_SPEED: 3,
  BOB_AMPLITUDE: 0.005,
} as const;

export type Movement = {
  [key: string]: boolean;
};

export const KEYS = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'jump',
  ShiftLeft: 'sprint',
} as const;