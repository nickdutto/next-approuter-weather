type WaterDataStation = {
  id: number;
  dischargeId: number;
  levelId: number;
  timezone: string;
  name: string;
  waterwayName: string;
  href: string;
  longitude: number;
  latitude: number;
};

//? Murrumbidgee River Stations
//! Removed Tantangara Reservoir until licence conditions are obtained from NSW - Snowy Hydro Limited
//! http://www.snowyhydro.com.au
// export const murrumbidgee_tantangara_reservoir: WaterDataStation = {
//   id: 410535,
//   dischargeId: 325639010,
//   levelId: 325665010,
//   timezone: 'Australia/Canberra',
//   name: 'Tantangara Reservoir - U/S',
//   waterwayName: 'Murrumbidgee River',
//   href: '/water/murrumbidgee-river/tantangara-reservoir',
//   longitude: 148.57027778,
//   latitude: -35.77055556,
// };

export const murrumbidgee_yaouk_no2: WaterDataStation = {
  id: 41000260,
  dischargeId: 148601010,
  levelId: 148623010,
  timezone: 'Australia/Canberra',
  name: 'Yaouk No.2',
  waterwayName: 'Murrumbidgee River',
  href: '/water/murrumbidgee-river/yaouk-no2',
  longitude: 148.79321619,
  latitude: -35.88474689,
};

export const murrumbidgee_mittagang_crossing: WaterDataStation = {
  id: 410033,
  dischargeId: 189843010,
  levelId: 149929010,
  timezone: 'Australia/Canberra',
  name: 'Mittagang Crossing',
  waterwayName: 'Murrumbidgee River',
  href: '/water/murrumbidgee-river/mittagang-crossing',
  longitude: 149.0947,
  latitude: -36.1644,
};

export const murrumbidgee_billilingra: WaterDataStation = {
  id: 410050,
  dischargeId: 150493010,
  levelId: 150519010,
  timezone: 'Australia/Canberra',
  name: 'Billilingra',
  waterwayName: 'Murrumbidgee River',
  href: '/water/murrumbidgee-river/billilingra',
  longitude: 149.1276,
  latitude: -35.9826,
};

export const murrumbidgee_michelago_creek: WaterDataStation = {
  id: 41000272,
  dischargeId: 189768010,
  levelId: 148977010,
  timezone: 'Australia/Canberra',
  name: 'Michelago Creek - U/S',
  waterwayName: 'Murrumbidgee River',
  href: '/water/murrumbidgee-river/michelago-creek',
  longitude: 149.137988,
  latitude: -35.702337,
};

export const murrumbidgee_angle_crossing: WaterDataStation = {
  id: 41001702,
  dischargeId: 1091010,
  levelId: 1117010,
  timezone: 'Australia/Canberra',
  name: 'Angle Crossing',
  waterwayName: 'Murrumbidgee River',
  href: '/water/murrumbidgee-river/angle-crossing',
  longitude: 149.114147,
  latitude: -35.585654,
};

export const murrumbidgee_lobbs_hole_creek: WaterDataStation = {
  id: 410761,
  dischargeId: 4039010,
  levelId: 4065010,
  timezone: 'Australia/Canberra',
  name: 'Lobbs Hole Creek',
  waterwayName: 'Murrumbidgee River',
  href: '/water/murrumbidgee-river/lobbs-hole-creek',
  longitude: 149.10119444,
  latitude: -35.53813889,
};

export const murrumbidgee_mt_macdonald: WaterDataStation = {
  id: 410738,
  dischargeId: 1795010,
  levelId: 1821010,
  timezone: 'Australia/Canberra',
  name: 'Mt. MacDonald',
  waterwayName: 'Murrumbidgee River',
  href: '/water/murrumbidgee-river/mt-macdonald',
  longitude: 148.95527639,
  latitude: -35.29166431,
};

export const murrumbidgee_halls_crossing: WaterDataStation = {
  id: 410777,
  dischargeId: 2388010,
  levelId: 2414010,
  timezone: 'Australia/Canberra',
  name: "Hall's Crossing",
  waterwayName: 'Murrumbidgee River',
  href: '/water/murrumbidgee-river/halls-crossing',
  longitude: 148.94475,
  latitude: -35.13136111,
};

export const murrumbidgee_stations = [
  // murrumbidgee_tantangara_reservoir,
  murrumbidgee_yaouk_no2,
  murrumbidgee_mittagang_crossing,
  murrumbidgee_billilingra,
  murrumbidgee_michelago_creek,
  murrumbidgee_angle_crossing,
  murrumbidgee_lobbs_hole_creek,
  murrumbidgee_mt_macdonald,
  murrumbidgee_halls_crossing,
];

//? Molonglo River Stations
export const molonglo_coppins_crossing: WaterDataStation = {
  id: 410756,
  dischargeId: 3995010,
  levelId: 4020010,
  timezone: 'Australia/Canberra',
  name: 'Coppins Crossing',
  waterwayName: 'Molonglo River',
  href: '/water/molonglo-river/coppins-crossing',
  longitude: 149.00860983,
  latitude: -35.27360722,
};

export const molonglo_sturt_island: WaterDataStation = {
  id: 410741,
  dischargeId: 1840010,
  levelId: 1866010,
  timezone: 'Australia/Canberra',
  name: 'Sturt Island',
  waterwayName: 'Molonglo River',
  href: '/water/molonglo-river/sturt-island',
  longitude: 148.961247,
  latitude: -35.24433,
};

export const molonglo_stations = [molonglo_coppins_crossing, molonglo_sturt_island];

//? Cotter River Stations
export const cotter_gingera: WaterDataStation = {
  id: 410730,
  dischargeId: 1570010,
  levelId: 1596010,
  timezone: 'Australia/Canberra',
  name: 'Gingera',
  waterwayName: 'Cotter River',
  href: '/water/cotter-river/gingera',
  longitude: 148.82191667,
  latitude: -35.58805556,
};

export const cotter_corin_dam: WaterDataStation = {
  id: 410729,
  dischargeId: 2051010,
  levelId: 2077010,
  timezone: 'Australia/Canberra',
  name: 'Corin Dam - D/S',
  waterwayName: 'Cotter River',
  href: '/water/cotter-river/corin-dam',
  longitude: 148.83594444,
  latitude: -35.53172222,
};

export const cotter_bendora_dam: WaterDataStation = {
  id: 410747,
  dischargeId: 1923010,
  levelId: 1949010,
  timezone: 'Australia/Canberra',
  name: 'Bendora Dam - D/S',
  waterwayName: 'Cotter River',
  href: '/water/cotter-river/bendora-dam',
  longitude: 148.82938889,
  latitude: -35.44527778,
};

export const cotter_vanitys_crossing: WaterDataStation = {
  id: 410725,
  dischargeId: 1508010,
  levelId: 1534010,
  timezone: 'Australia/Canberra',
  name: "Vanity's Crossing",
  waterwayName: 'Cotter River',
  href: '/water/cotter-river/vanitys-crossing',
  longitude: 148.89,
  latitude: -35.35,
};

export const cotter_cotter_kiosk: WaterDataStation = {
  id: 410700,
  dischargeId: 1141010,
  levelId: 1163010,
  timezone: 'Australia/Canberra',
  name: 'Cotter Kiosk',
  waterwayName: 'Cotter River',
  href: '/water/cotter-river/cotter-kiosk',
  longitude: 148.94175,
  latitude: -35.32402778,
};

export const cotter_stations = [
  cotter_gingera,
  cotter_corin_dam,
  cotter_bendora_dam,
  cotter_vanitys_crossing,
  cotter_cotter_kiosk,
];

//? Condor Creek Stations
export const condor_creek_threeways: WaterDataStation = {
  id: 410733,
  dischargeId: 1660010,
  levelId: 1686010,
  timezone: 'Australia/Canberra',
  name: 'Threeways',
  waterwayName: 'Condor Creek',
  href: '/water/condor-creek/threeways',
  longitude: 148.88834802,
  latitude: -35.33019071,
};

export const condor_creek_stations = [condor_creek_threeways];

//? Gudgenby River Stations
export const gudgenby_tennent: WaterDataStation = {
  id: 410731,
  dischargeId: 1621010,
  levelId: 1643010,
  timezone: 'Australia/Canberra',
  name: 'Tennent',
  waterwayName: 'Gudgenby River',
  href: '/water/gudgenby-river/tennent',
  longitude: 149.06811389,
  latitude: -35.57187222,
};

export const gudgenby_stations = [gudgenby_tennent];

//? Orroral River Stations
export const orroral_orroral_rd_crossing: WaterDataStation = {
  id: 410736,
  dischargeId: 1755010,
  levelId: 1777010,
  timezone: 'Australia/Canberra',
  name: 'Orroral Rd Crossing',
  waterwayName: 'Orroral River',
  href: '/water/orroral-river/orroral-rd-crossing',
  longitude: 148.98936111,
  latitude: -35.66505556,
};

export const orroral_stations = [orroral_orroral_rd_crossing];

export const water_data_stations = [
  ...murrumbidgee_stations,
  ...molonglo_stations,
  ...cotter_stations,
  ...condor_creek_stations,
  ...gudgenby_stations,
  ...orroral_stations,
];
