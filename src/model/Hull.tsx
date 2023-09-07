export type RawRoadSideHull = {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
  properties: {
    address: {
      "0": string;
      "1": string;
      "2": string;
    };
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
    address: string[];
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
  if (geoJson.properties.address == undefined) {
    return {
      ...geoJson,
      properties: {
        level: level,
        address: ["", "", ""],
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
      address: [
        geoJson.properties.address["0"],
        geoJson.properties.address["1"],
        geoJson.properties.address["2"],
      ],
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
  address: string[3];
  roadnames: string[2];
};
