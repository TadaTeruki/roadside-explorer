import { RawRoadSideHull, RoadSideHull, parseRoadSideHull } from "./Hull";

export type RoadSideData = {
  hulls: RoadSideHull[][];
  hull_levels: number;
};

export async function LoadRoadSideData(
  path: string,
  roadSideHullSrcName: string,
) {
  const hulls: RoadSideHull[][] = [];
  const levels = 6;

  for (let i = 0; i < levels; i++) {
    const response = await fetch(
      path + roadSideHullSrcName + "_" + i + ".geojson",
    );
    const geoJson = await response.json();

    const hullsLevel = geoJson.features.map((geoJson: RawRoadSideHull) =>
      parseRoadSideHull(geoJson, i),
    );
    hulls.push(hullsLevel);
  }

  const roadSideData: RoadSideData = {
    hulls: hulls,
    hull_levels: levels,
  };

  return roadSideData;
}
