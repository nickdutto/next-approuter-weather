import { set, sub } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import RiverContainer from '~/components/river/RiverContainer';
import { type RiverData } from '~/types/types';

const getRiverData = async () => {
  const date = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

  const toDate = formatInTimeZone(
    date,
    'Australia/Canberra',
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  ).replace(/\+/g, '%2B');
  const fromDate = formatInTimeZone(
    sub(date, { months: 1 }),
    'Australia/Canberra',
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  ).replace(/\+/g, '%2B');

  const params = new URLSearchParams({
    service: 'kisters',
    type: 'queryServices',
    request: 'getTimeseriesValues',
    datasource: '0',
    format: 'json',
    from: fromDate,
    to: toDate,
    returnfields: 'Timestamp,Value',
    md_returnfields:
      'station_longname,station_no,station_latitude,station_longitude,parametertype_name',
    custattr_returnfields: 'DATA_OWNER_NAME',
    metadata: 'true',
  });

  const urlDischarge = `http://www.bom.gov.au/waterdata/services?${params.toString()}&ts_id=1795010`;
  const urlLevel = `http://www.bom.gov.au/waterdata/services?${params.toString()}&ts_id=1821010`;

  const resDischarge = await fetch(urlDischarge, {
    next: {
      revalidate: 3600,
    },
  });

  const resLevel = await fetch(urlLevel, {
    next: {
      revalidate: 3600,
    },
  });

  const dataDischarge = (await resDischarge.json()) as unknown as RiverData[];
  const dataLevel = (await resLevel.json()) as unknown as RiverData[];

  return {
    discharge: dataDischarge,
    level: dataLevel,
  };
};

const RiverPage = async () => {
  const riverData = await getRiverData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <RiverContainer riverData={riverData} />
    </main>
  );
};

export default RiverPage;
