'use client';

import { Popup as GlPopup } from 'react-map-gl/maplibre';

import WaterDataPopup from '~/components/map/WaterDataPopup';

export type PopupInfo = {
  href?: string;
  dischargeId: number;
  levelId: number;
  timezone: string;
  longitude: number;
  latitude: number;
  title: string;
  subTitle?: string;
};

type Props = {
  popupInfo: PopupInfo | null;
  setPopupInfo: (popupInfo: PopupInfo | null) => void;
};

const Popup = ({ popupInfo, setPopupInfo }: Props) => {
  return (
    <>
      {popupInfo && (
        <GlPopup
          anchor="top"
          closeButton={false}
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
        >
          <WaterDataPopup popupInfo={popupInfo} />
        </GlPopup>
      )}
    </>
  );
};

export default Popup;
