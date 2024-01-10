'use client';

import { Marker } from 'react-map-gl/maplibre';

import GisPoiIcon from '~/components/icon/GisPoiIcon';
import { type PopupInfo } from '~/components/map/Popup';
import { water_data_stations } from '~/data/waterdata-stations';

type Props = {
  setPopupInfo: (popupInfo: PopupInfo | null) => void;
};

const WaterDataMarkers = ({ setPopupInfo }: Props) => {
  return (
    <>
      {water_data_stations.map((station) => (
        <Marker
          key={station.id}
          longitude={station.longitude}
          latitude={station.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo({
              href: station.href,
              dischargeId: station.dischargeId,
              levelId: station.levelId,
              timezone: station.timezone,
              longitude: station.longitude,
              latitude: station.latitude,
              title: station.name,
              subTitle: station.waterwayName,
            });
          }}
        >
          <GisPoiIcon className="h-5 w-5 cursor-pointer" />
        </Marker>
      ))}
    </>
  );
};

export default WaterDataMarkers;
