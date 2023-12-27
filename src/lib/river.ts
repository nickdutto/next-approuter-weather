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
