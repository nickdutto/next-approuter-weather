const Page = () => {
  return (
    <main className="relative h-full w-full overflow-hidden rounded-m-lg pt-4">
      <iframe
        src="https://embed.windy.com/embed2.html?lat=-35.684&lon=148.914&detailLat=-35.300&detailLon=149.100&zoom=8&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"
        className="h-[calc(100svh-100px)] w-full overflow-hidden rounded-m-lg"
      />
    </main>
  );
};

export default Page;
