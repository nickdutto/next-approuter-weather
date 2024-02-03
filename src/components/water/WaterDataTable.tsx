'use client';

import { createColumnHelper } from '@tanstack/react-table';

import clsx from 'clsx';
import { useMemo } from 'react';

import Table from '~/components/table/Table';
import { type WaterData } from '~/lib/validators/WaterDataValidator';
import { formatWaterDataTableValues } from '~/lib/water';

type RiverTableData = {
  timestamp: string;
  value: string | number;
  change: string;
};

type Props = {
  waterData: WaterData;
};

const WaterDataTable = ({ waterData }: Props) => {
  const data = useMemo((): RiverTableData[] => {
    return formatWaterDataTableValues(waterData.data);
  }, [waterData]);

  const columns = useMemo(() => {
    const helper = createColumnHelper<RiverTableData>();
    return [
      helper.accessor('timestamp', {
        cell: (row) => row.getValue(),
      }),
      helper.accessor('value', {
        cell: (row) => Number(row.getValue()).toFixed(3),
      }),
      helper.accessor('change', {
        cell: (row) => {
          const className = clsx([
            row.getValue().startsWith('+') && 'text-m-red-6',
            row.getValue().startsWith('-') && 'text-m-green-6',
            row.getValue().startsWith('0') && 'text-m-blue-6',
          ]);

          return <span className={className}>{row.getValue()}</span>;
        },
      }),
    ];
  }, []);

  return (
    <Table<RiverTableData>
      title={waterData.parametertype_name}
      data={data}
      columns={columns}
      wrapperProps={{ className: 'h-[calc(100svh-304px)] sm:h-[calc(100svh-380px)]' }}
      tableProps={{ className: 'w-full' }}
    />
  );
};

export default WaterDataTable;
