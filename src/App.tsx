import { useEffect, useState } from "react";
import "./App.css";
import MainContainer from "./components/Containers/MainContainer/MainContainer";
import MapView from "./components/Elements/MapView/MapView";
import { LoadRoadSideData, RoadSideData } from "./model/Container";
import Header from "./components/Elements/Header/Header";
import { initConfig } from "./model/Config";
import Credit from "./components/Elements/Credit/Credit";

function App() {
  let [dataRoadSide, setDataRoadSide] = useState({
    pois: [],
    hulls: [],
    hull_levels: 0,
  } as RoadSideData);
  useEffect(() => {
    LoadRoadSideData("/data/", "roadside_hull").then((data) => {
      setDataRoadSide(data);
    });
  }, []);

  const config = initConfig();

  return (
    <>
      <Header />
      <MainContainer>
        <MapView dataRoadSide={dataRoadSide} config={config} />
      </MainContainer>
      <Credit />
    </>
  );
}

export default App;
