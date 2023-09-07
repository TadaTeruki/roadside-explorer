import Map, {
  Layer,
  MapGeoJSONFeature,
  Source,
  Popup,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { RoadSideData } from "../../../model/Container";
import { useState } from "react";
import { HullInfo } from "../../../model/Hull";
import styles from "./MapView.module.css";

const hullId = (level: number) => {
  return "hulls_" + level;
};

const getLevelFromHullId = (hullId: string) => {
  return parseInt(hullId.split("_")[1]);
};

const createHullLayers = (dataRoadSide: RoadSideData, level: number) => {
  if (level >= dataRoadSide.hull_levels) {
    return <></>;
  }
  const opacity = 0.03;
  return (
    <div key={level}>
      <Source
        id={"roadside_hulls_" + level}
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: dataRoadSide.hulls[level],
        }}
      >
        <Layer
          id={hullId(level)}
          type="fill"
          source={"roadside_" + level}
          paint={{
            "fill-color": "red",
            "fill-opacity": opacity,
          }}
        />
      </Source>
      <Source
        id={"roadside_hulls_" + level + "_main"}
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: dataRoadSide.hulls[level].filter((hull) => {
            return hull.properties.hasroad;
          }),
        }}
      >
        <Layer
          id={hullId(level) + "_main"}
          type="fill"
          source={"roadside_" + level}
          paint={{
            "fill-color": "red",
            "fill-opacity": 0.2,
          }}
        />
        <Layer
          id={hullId(level) + "_main_text"}
          type="symbol"
          source={"roadside_" + level}
          layout={{
            "text-field": ["get", "mainRoad"],
            "text-font": ["Noto Sans Regular"],
            "text-size": 12,
          }}
          paint={{
            "text-color": "#533",
          }}
        />
      </Source>
    </div>
  );
};

export const MapView = (props: { dataRoadSide: RoadSideData }) => {
  const [focusCoord, setFocusCoord] = useState({ longitude: 0, latitude: 0 });
  const [focusHullLayer, setFocusHullLayer] = useState({} as MapGeoJSONFeature);
  const [hoverHullLayer, setHoverHullLayer] = useState({} as MapGeoJSONFeature);
  const [hullInfo, setHullInfo] = useState({} as HullInfo);
  const [showPopup, setShowPopup] = useState(false);

  const hullLayers = props.dataRoadSide.hulls.map((_, level) => {
    return createHullLayers(props.dataRoadSide, level);
  });

  let hullIds = (function () {
    let ids: string[] = [];
    for (let i = 0; i < props.dataRoadSide.hulls.length; i++) {
      ids.push(hullId(i));
    }
    return ids;
  })();

  const maxLevel = props.dataRoadSide.hulls.length - 1;

  return (
    <Map
      initialViewState={{
        longitude: 139.7,
        latitude: 35.7,
        zoom: 7,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      interactiveLayerIds={props.dataRoadSide.hulls.length === 0 ? [] : hullIds}
      onMouseMove={(e) => {
        if (!e.features) return;
        const target = e.features[0];
        if (target === hoverHullLayer) return;
        setHoverHullLayer({} as MapGeoJSONFeature);
        if (!target) return;
        if (!target.properties) return;
        if (JSON.parse(target.properties.roadnames)[0] == "") return;
        setHoverHullLayer(target);
      }}
      onClick={(e) => {
        setShowPopup(false);

        if (!e.features) return;
        const target = e.features[0];
        if (!target) return;
        if (!target.properties) return;

        const hullId = getLevelFromHullId(target.layer.id);

        const center = JSON.parse(target.properties.center);
        const address = JSON.parse(target.properties.address);
        const roadnames = JSON.parse(target.properties.roadnames);

        if (roadnames[0] == "") return;

        setFocusCoord({
          longitude: center[0],
          latitude: center[1],
        });

        const hullInfo = {
          center: center,
          address: address,
          roadnames: roadnames,
        } as HullInfo;

        setHullInfo(hullInfo);
        setFocusHullLayer(target);
        setShowPopup(true);
      }}
    >
      {showPopup && (
        <Popup
          longitude={focusCoord.longitude}
          latitude={focusCoord.latitude}
          anchor="bottom"
          onClose={() => {
            setShowPopup(false);
          }}
          closeButton={false}
          closeOnClick={false}
        >
          <strong>中心地域</strong>
          <br />
          <span className={styles.detail}>
            {hullInfo.address[0]}
            {hullInfo.address[1]}
          </span>{" "}
          {hullInfo.address[2]}
          <br />
          <br />
          <strong>主要道路</strong>
          <br />
          {hullInfo.roadnames[0]}
          <br />
          {hullInfo.roadnames[1] != "" && hullInfo.roadnames[1]}
        </Popup>
      )}

      {hullLayers}

      <Source
        id={"hover_hull"}
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: [hoverHullLayer],
        }}
      >
        <Layer
          id={"hover_hull"}
          type="fill"
          source={"hover_hull"}
          paint={{
            "fill-color": "#f55",
            "fill-opacity": 0.4,
          }}
        />
      </Source>

      <Source
        id={"focus_hull"}
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: [focusHullLayer],
        }}
      >
        <Layer
          id={"focus_hull"}
          type="fill"
          source={"focus_hull"}
          paint={{
            "fill-color": "blue",
            "fill-opacity": 0.6,
          }}
        />
      </Source>
    </Map>
  );
};

export default MapView;
