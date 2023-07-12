import RiverContainer from '~/components/river/RiverContainer';
import { type RiverData } from '~/types/types';

const getWatercourseDischarge = async () => {
  const res = await fetch(
    'http://www.bom.gov.au/waterdata/services?service=kisters&type=queryServices&request=getTimeseriesValues&datasource=0&format=json&ts_id=1795010&from=2023-06-11T00%3A00%3A00.000%2B10%3A00&to=2023-07-12T00%3A00%3A00.000%2B10%3A00&returnfields=Timestamp,Value&language=en&timezone=individual&csvdiv=,&md_returnfields=station_longname,station_no,station_latitude,station_longitude,parametertype_name,ts_name,ts_unitname,custom_attributes&custattr_returnfields=DATA_OWNER_NAME&metadata=true&downloadfilename=json.w00002.20230712123746.410738%20HTTP%2F1.1',
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  return res.json() as unknown as RiverData[];
};

const getWaterLevel = async () => {
  const res = await fetch(
    'http://www.bom.gov.au/waterdata/services?service=kisters&type=queryServices&request=getTimeseriesValues&datasource=0&format=json&ts_id=1821010&from=2023-06-11T00%3A00%3A00.000%2B10%3A00&to=2023-07-12T00%3A00%3A00.000%2B10%3A00&returnfields=Timestamp,Value&language=en&timezone=individual&csvdiv=,&md_returnfields=station_longname,station_no,station_latitude,station_longitude,parametertype_name,ts_name,ts_unitname,custom_attributes&custattr_returnfields=DATA_OWNER_NAME&metadata=true&downloadfilename=json.w00002.20230712123746.410738%20HTTP%2F1.1',
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  return res.json() as unknown as RiverData[];
};

const RiverPage = async () => {
  const watercourseDischarge = await getWatercourseDischarge();
  const waterLevel = await getWaterLevel();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <RiverContainer watercourseDischarge={watercourseDischarge} waterLevel={waterLevel} />
    </main>
  );
};

export default RiverPage;
