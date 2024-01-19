'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import '~/styles/maplibregl.css';

import { useState } from 'react';
import GlMap, { GeolocateControl, NavigationControl, ScaleControl } from 'react-map-gl/maplibre';

import Popup, { type PopupInfo } from '~/components/map/Popup';
import WaterDataMarkers from '~/components/map/WaterDataMarkers';

const Map = () => {
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  return (
    <GlMap
      initialViewState={{
        longitude: 149.069,
        latitude: -35.7,
        zoom: 7,
      }}
      minPitch={0}
      maxPitch={0}
      style={{ width: '100%', height: '100%' }}
      reuseMaps
      mapStyle={`https://api.maptiler.com/maps/14fa0bc7-431f-434e-be9c-f8ca8f6d0636/style.json?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}`}
    >
      <GeolocateControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      <WaterDataMarkers setPopupInfo={setPopupInfo} />
      <Popup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
    </GlMap>
  );
};

export default Map;
