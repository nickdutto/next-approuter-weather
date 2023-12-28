import clsx from 'clsx';

export type RiverQualitySteps = {
  low: number;
  medium: number;
  high: number;
  veryHigh: number;
  extreme: number;
};

export const baseWaterDataParams = {
  service: 'kisters',
  type: 'queryServices',
  request: 'getTimeseriesValues',
  datasource: '0',
  format: 'json',
  returnfields: 'Timestamp,Value',
  md_returnfields:
    'station_longname,station_no,station_latitude,station_longitude,parametertype_name,ts_name,ts_unitname,custom_attributes',
  custattr_returnfields: 'DATA_OWNER_NAME',
  metadata: 'true',
};

export const riverQualityCn = (level: number, steps: RiverQualitySteps) => {
  return clsx([
    level <= steps.low && 'bg-m-blue-7',
    level > steps.low && level <= steps.medium && 'bg-m-green-7',
    level > steps.medium && level <= steps.high && 'bg-m-yellow-7',
    level > steps.high && level <= steps.veryHigh && 'bg-m-orange-7',
    level > steps.veryHigh && level <= steps.extreme && 'bg-m-red-7',
    level > steps.extreme && 'bg-m-grape-7',
    level === 0 && 'bg-m-gray-7',
  ]);
};
