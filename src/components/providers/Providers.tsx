import { type ReactNode } from 'react';

import MantineProvider from '~/components/providers/MantineProvider';
import NavProgressProvider from '~/components/providers/NavProgressProvider';
import QueryProvider from '~/components/providers/QueryProvider';

type Props = {
  sansFont?: string;
  monoFont?: string;
  children: ReactNode;
};

const Providers = ({ sansFont, monoFont, children }: Props) => {
  return (
    <QueryProvider>
      <MantineProvider sansFont={sansFont} monoFont={monoFont}>
        <NavProgressProvider />
        {children}
      </MantineProvider>
    </QueryProvider>
  );
};

export default Providers;
