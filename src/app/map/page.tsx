import Map from '~/components/map/Map';

const Page = () => {
  return (
    <main className="flex h-full min-h-[calc(100svh-84px)] w-full flex-col gap-2 pt-4">
      <div className="h-full w-full overflow-hidden rounded-m-lg">
        <Map />
      </div>
    </main>
  );
};

export default Page;
