'use client';

import 'maplibre-gl/dist/maplibre-gl.css';

import { useState } from 'react';
import GlMap from 'react-map-gl/maplibre';

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
      style={{ width: '100%', height: '100%' }}
      mapStyle={`https://api.maptiler.com/maps/backdrop-dark/style.json?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}`}
    >
      <WaterDataMarkers setPopupInfo={setPopupInfo} />
      <Popup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
    </GlMap>
  );
};

export default Map;
