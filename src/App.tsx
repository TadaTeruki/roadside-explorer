import { useEffect, useState } from "react";
import "./App.css";
import MainContainer from "./components/Containers/MainContainer/MainContainer";
import MapView from "./components/Elements/MapView/MapView";
import { LoadRoadSideData, RoadSideData } from "./model/Container";
import Header from "./components/Elements/Header/Header";

function App() {
  let [dataRoadSide, setDataRoadSide] = useState({
    pois: [],
    hulls: [],
    hull_levels: 0,
  } as RoadSideData);
  useEffect(() => {
    LoadRoadSideData("/public/data/", "roadside_hull").then((data) => {
      setDataRoadSide(data);
    });
  }, []);

  return (
    <>
      <Header />
      <MainContainer>
        <MapView dataRoadSide={dataRoadSide} />
      </MainContainer>
    </>
  );
}

export default App;
