import { Skeleton } from '~/components/ui/skeleton';

const Loading = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Skeleton className="h-[250px] w-1/3" />;
    </main>
  );
};

export default Loading;
