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
import { Config } from "../../../model/Config";

const hullId = (level: number) => {
  return "hulls_" + level;
};

const createHullLayers = (dataRoadSide: RoadSideData, level: number) => {
  if (level >= dataRoadSide.hull_levels) {
    return <></>;
  }
  return (
    <div key={level}>
      <Source
        id={"roadside_hulls_" + level}
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: dataRoadSide.hulls[level].filter((hull) => {
            return !hull.properties.hasroad;
          }),
        }}
      >
        <Layer
          id={hullId(level)}
          type="fill"
          source={"roadside_" + level}
          paint={{
            "fill-color": "red",
            "fill-opacity": 0.03,
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
            "fill-opacity": 0.25,
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
            "text-color": "#622",
            "text-halo-width": 1,
            "text-halo-color": "#fafafa",
          }}
        />
      </Source>
    </div>
  );
};

export const MapView = (props: {
  dataRoadSide: RoadSideData;
  config: Config;
}) => {
  const [focusCoord, setFocusCoord] = useState({ longitude: 0, latitude: 0 });
  const [focusHullLayer, setFocusHullLayer] = useState({} as MapGeoJSONFeature);
  const [hoverHullLayer, setHoverHullLayer] = useState({} as MapGeoJSONFeature);
  const [hullInfo, setHullInfo] = useState({} as HullInfo);
  const [showPopup, setShowPopup] = useState(false);
  const [showHoverPopup, setShowHoverPopup] = useState(false);

  const hullLayers = props.dataRoadSide.hulls.map((_, level) => {
    return createHullLayers(props.dataRoadSide, level);
  });

  let hullIds = (function () {
    let ids: string[] = [];
    for (let i = 0; i < props.dataRoadSide.hulls.length; i++) {
      ids.push(hullId(i) + "_main");
    }
    return ids;
  })();

  const mapOnClick = (e: any) => {
    setShowPopup(false);

    if (!e.features) return;
    const target = e.features[0];
    if (!target) return;
    if (!target.properties) return;

    const center = JSON.parse(target.properties.center);
    const roadnames = JSON.parse(target.properties.roadnames);

    if (roadnames[0] == "") return;

    setFocusCoord({
      longitude: center[0],
      latitude: center[1],
    });

    const hullInfo = {
      center: center,
      roadnames: roadnames,
    } as HullInfo;

    setHullInfo(hullInfo);
    setFocusHullLayer(target);
    setShowPopup(true);
    setHoverHullLayer({} as MapGeoJSONFeature);
  };

  return (
    <Map
      initialViewState={{
        longitude: 139.82457942811905,
        latitude: 35.8796521668946,
        zoom: 6,
      }}
      style={{ width: "100vw", height: "100%" }}
      mapStyle="https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json"
      interactiveLayerIds={props.dataRoadSide.hulls.length === 0 ? [] : hullIds}
      onMouseMove={(e) => {
        setShowHoverPopup(false);
        if (!e.features) return;
        const target = e.features[0];
        if (target === hoverHullLayer) return;
        setHoverHullLayer({} as MapGeoJSONFeature);
        if (!target) return;
        if (!target.properties) return;
        const mainRoad = target.properties.mainRoad;
        const focusMainRoad = (function () {
          if (focusHullLayer.properties == undefined) return "";
          return focusHullLayer.properties.mainRoad;
        })();
        if (mainRoad == "" || mainRoad == focusMainRoad) return;
        setHoverHullLayer(target);
        setShowHoverPopup(true);
      }}
      onTouchEnd={mapOnClick}
      onClick={mapOnClick}
    >
      {showHoverPopup && hoverHullLayer.properties && (
        <Popup
          longitude={JSON.parse(hoverHullLayer.properties.center)[0]}
          latitude={JSON.parse(hoverHullLayer.properties.center)[1]}
          anchor="bottom"
          onClose={() => {
            setHoverHullLayer({} as MapGeoJSONFeature);
            setShowHoverPopup(false);
          }}
          closeButton={false}
          closeOnClick={false}
        >
          {hoverHullLayer.properties.mainRoad}
          <div className={styles.detail}>選択して詳細を表示</div>
        </Popup>
      )}
      {showPopup && (
        <Popup
          longitude={focusCoord.longitude}
          latitude={focusCoord.latitude}
          anchor="bottom"
          onClose={() => {
            setFocusHullLayer({} as MapGeoJSONFeature);
            setShowPopup(false);
          }}
          closeOnClick={false}
        >
          <div className={styles.roadname}>{hullInfo.roadnames[0]}</div>
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
