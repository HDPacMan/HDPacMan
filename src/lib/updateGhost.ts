import { chooseNewTargetTile } from './chooseNewTargetTile';
import { chooseNextTile } from './chooseNextTile';
import { TileCoordinates } from './Coordinates';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Ghost } from './Ghost';
import { Direction } from './Types';
import { DIRECTION_TO_DELTA, isTileCenter } from './Ways';

export const updateGhost = ({
  ghost,
  timestamp,
}: {
  ghost: Ghost;
  timestamp: number;
}) => {
  ghost.timestamp = timestamp;

  if (ghost.ghostPaused) {
    return;
  }

  if (isGhostAtTileCenter(ghost)) {
    reRouteGhost(ghost);
  }

  const delta = getGhostVelocity(ghost.direction);
  ghost.moveBy(delta);
};

const updateDirection = (ghost: Ghost) => {
  const newDirection = getNewDirection(ghost);
  ghost.direction = newDirection;
};

const getNewDirection = (ghost: Ghost): Direction => {
  const currentTile = ghost.tileCoordinates;
  const currentDirection = ghost.direction;
  const targetTile = ghost.targetTile;
  const nextTile: TileCoordinates = chooseNextTile({
    currentTile,
    currentDirection,
    targetTile,
  });

  return getDirectionFromTileToTile(currentTile, nextTile);
};

const getGhostVelocity = (direction: Direction) => {
  return DIRECTION_TO_DELTA[direction];
};

const isGhostAtTileCenter = (ghost: Ghost): boolean => {
  return isTileCenter(ghost.screenCoordinates);
};

// const chooseRandomDirection = (
//   currentTile: TileCoordinates,
//   currentDirection: Direction
// ): Direction => {
//   const candidates: Direction[] = [];

//   for (const direction of Directions) {
//     const neighbourTile = getNextTile(currentTile, direction);

//     if (!isValidTileCoordinates(neighbourTile)) {
//       continue;
//     }

//     // Is this way free?
//     if (!isWayFreeAt(neighbourTile)) {
//       continue;
//     }

//     candidates.push(direction);
//   }
//   if (candidates.length === 0) {
//     throw new Error(`No directions at ${currentTile}`);
//   }

//   return candidates[0];
// };

const reRouteGhost = (ghost: Ghost) => {
  ghost.targetTile = chooseNewTargetTile(ghost);
  updateDirection(ghost);
};
