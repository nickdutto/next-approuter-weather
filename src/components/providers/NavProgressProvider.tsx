'use client';

import { Next13ProgressBar } from 'next13-progressbar';
import { Suspense } from 'react';

const NavProgressProvider = () => {
  return (
    <Suspense>
      <Next13ProgressBar
        height="4px"
        color="#1c7ed6"
        options={{ showSpinner: false }}
        showOnShallow
      />
    </Suspense>
  );
};

export default NavProgressProvider;
