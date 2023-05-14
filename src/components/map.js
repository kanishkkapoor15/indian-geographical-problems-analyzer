import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { useSelector } from "react-redux";
import { propertyMap } from "./properties.js";
import states from "../assets/states2.json"

const CENTER = [23.878932, 77.502576];
const INITIAL_VIEW_STATE = {
  longitude: CENTER[1],
  latitude: CENTER[0],
  zoom: 3.9,
  minZoom: 4,
  maxZoom: 4  
};

const ON_VIEW_STATE_CHANGE = ({ viewState }) => {
  viewState.longitude = CENTER[1];
  viewState.latitude = CENTER[0];
  return viewState;
};

const MAP_STYLE =
  'https://free.tilehosting.com/styles/positron/style.json?key=U0iNgiZKlYdwvgs9UPm1';

export default function Map() {
  const property = useSelector((state) => state.propertyStore.property);

  function getColor(d) {
    for (let i = 0; i < propertyMap["color"].length; i++) {
      if (d > propertyMap[property][i]) return propertyMap["color"][i];
    }
  }
const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};
  const layers = [
    new GeoJsonLayer({
      id: "geojson",
      data: states,
      stroked: true,
      filled: true,
      lineWidthScale: 20,
      pickable: true,
      lightSettings: LIGHT_SETTINGS,
      autoHighlight: true,
      getFillColor: (d) => getColor(d.properties[property]),
      updateTriggers: {
        getFillColor: [property]
      },
      getLineColor: [3, 13, 18],
      lineWidthMinPixels: 1,
      onClick: ({ object }) => {
        const el = document.getElementById("info");
        if (object) {
          el.innerHTML = `<b>${object.properties.name}</b><br />
          Domestic Violence(per year): ${object.properties.domesticViolence}<br />
          Pollution: ${object.properties.pollution}<br />
          Human Trafficking(per year): ${object.properties.humanTrafficking}<br />
          Poverty: ${object.properties.poverty}<br />
          Rape Cases(per year): ${object.properties.rapeCases}<br />
          Illiteracy(in percentage): ${object.properties.illiteracy}<br />`;
          
        } else {
          el.innerHTML = `Click on state for details`;
        }
      }
    })
  ];

  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      onViewStateChange={ON_VIEW_STATE_CHANGE}
      getCursor={() => "default"}
    >
      <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}
