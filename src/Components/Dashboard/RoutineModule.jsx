import React, { useContext } from "react";
import { getIconSVG, IconContext } from "../../Providers/IconProvider";
import { RoutineContext } from "../../Providers/RoutineProvider";

import { getGridCellSize, intToColor } from "../../Tools";

import "../../Styles/Dashboard/RoutineModule.css";

const RoutineModule = () => {
  const { icons } = useContext(IconContext);
  const { routines } = useContext(RoutineContext);

  const gridCellSize = getGridCellSize();
  const gridStartX = 3,
    gridStartY = 4;
  const gridWidth = 2,
    gridHeight = 2;

  const iconSize = 48;

  return (
    <div
      className="glass card routineModule"
      style={{
        gridColumn: gridStartX,
        gridColumnEnd: gridStartX + gridWidth,
        gridRow: gridStartY,
        gridRowEnd: gridStartY + gridHeight,
        fontSize: `${gridCellSize / 100}rem`,
      }}
    >
      <h3>Routines</h3>
      {routines && routines.length > 0
        ? routines.map((routine, i) => {
            const tileIconSize =
              routine.tiles.length < 4
                ? iconSize
                : iconSize / 2;

            return (
              <div
                className="routine"
                key={routine.uid}
                style={{ height: `${iconSize}px` }}
              >
                <div className="routineInfo">
                  <h5 className="routineName">{routine.name}</h5>
                  <span className="routineMode">
                    {routine.mode === 0 ? "Sequential" : "Continuous"}
                  </span>
                </div>
                <div
                  className="routineTiles"
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                  }}
                >
                  {routine.tiles.map((tile, i) => {
                    if (i >= 4) return null;

                    return (
                      <div
                        className={`routineTile routineTile${
                          routine.tiles.length < 4 ? "All" : i
                        }`}
                        key={tile.uid}
                        style={{
                          backgroundColor: intToColor(tile.backgroundColor),
                          width: `${tileIconSize}px`,
                          height: `${tileIconSize}px`,
                        }}
                      >
                        {getIconSVG(
                          tile.iconID,
                          tileIconSize,
                          tileIconSize,
                          tile.contrastColor,
                          icons
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        : <p className="noRoutines">There are no routines here yet. Use the RoutineTimer app to create some!</p>}
    </div>
  );
};

export default RoutineModule;
