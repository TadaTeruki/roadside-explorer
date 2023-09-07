// WARNING: This will be never used.

export type RawRoadSidePOI = {
  type: "Feature";
  properties: {
    id: string;
    category: string;
    cluster_0: number;
    cluster_1: number;
    cluster_2: number;
    cluster_3: number;
    cluster_4: number;
    cluster_5: number;
    name: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

export type RoadSidePOI = {
  type: "Feature";
  properties: {
    id: string;
    category: string;
    clusters: number[];
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

export function parseRoadSidePOI(geoJson: RawRoadSidePOI): RoadSidePOI {
  return {
    ...geoJson,
    properties: {
      ...geoJson.properties,
      clusters: [
        geoJson.properties.cluster_0,
        geoJson.properties.cluster_1,
        geoJson.properties.cluster_2,
        geoJson.properties.cluster_3,
        geoJson.properties.cluster_4,
        geoJson.properties.cluster_5,
      ],
    },
  };
}
