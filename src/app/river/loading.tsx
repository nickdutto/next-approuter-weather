import { Skeleton } from '~/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="grid w-full grid-cols-1 grid-rows-1 gap-4 px-2">
      <Skeleton className="h-[400px] w-full" />
      <Skeleton className="h-[400px] w-full" />
      <Skeleton className="h-[400px] w-full" />
    </div>
  );
};

export default Loading;
