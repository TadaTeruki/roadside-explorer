export type RawRoadSideHull = {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
  properties: {
    center: {
      type: "Point";
      coordinates: {
        longitude: number;
        latitude: number;
      };
    };
    roadnames: {
      "0": string;
      "1": string;
    };
  };
};

export type RoadSideHull = {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
  properties: {
    level: number;
    center: [number, number];
    roadnames: string[];
    mainRoad: string;
    hasroad: boolean;
  };
};

export function parseRoadSideHull(
  geoJson: RawRoadSideHull,
  level: number,
): RoadSideHull {
  if (geoJson.properties.roadnames == undefined) {
    return {
      ...geoJson,
      properties: {
        level: level,
        center: [0, 0],
        roadnames: ["", ""],
        mainRoad: "",
        hasroad: false,
      },
    };
  }
  return {
    ...geoJson,
    properties: {
      level: level,
      center: [
        geoJson.properties.center.coordinates.longitude,
        geoJson.properties.center.coordinates.latitude,
      ],
      roadnames: [
        geoJson.properties.roadnames["0"],
        geoJson.properties.roadnames["1"],
      ],
      mainRoad: geoJson.properties.roadnames["0"],
      hasroad: (function () {
        return geoJson.properties.roadnames["0"] != "";
      })(),
    },
  };
}

export type HullInfo = {
  center: [number, number];
  roadnames: string[2];
};
