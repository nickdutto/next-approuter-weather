'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import clsx from 'clsx';
import { formatInTimeZone } from 'date-fns-tz';
import { useMemo } from 'react';

import { type RiverData } from '~/types/types';

type RiverTableData = {
  timestamp: string;
  value: string | number;
  change: string;
};

type Props = {
  riverData: RiverData[];
};

const NewRiverTable = ({ riverData }: Props) => {
  const data = useMemo((): RiverTableData[] => {
    return riverData[0].data
      .slice()
      .reverse()
      .filter((data) => data[1] !== null)
      .map((data, index, self) => {
        let change = '0.000';
        if (index > 0) {
          const diff = Number(data[1]) - Number(self[index - 1][1]);
          if (diff > 0) {
            change = `+ ${diff.toFixed(3)}`;
          } else if (diff < 0) {
            change = `- ${Math.abs(diff).toFixed(3)}`;
          }
        }

        return {
          timestamp: formatInTimeZone(data[0], '+10', 'dd/MM/yy - HH:mm'),
          value: data[1] ?? '',
          change: change,
        };
      });
  }, [riverData]);

  const columns = useMemo(() => {
    const helper = createColumnHelper<RiverTableData>();
    return [
      helper.accessor('timestamp', {
        cell: (row) => row.getValue(),
      }),
      helper.accessor('value', {
        cell: (row) => row.getValue(),
      }),
      helper.accessor('change', {
        cell: (row) => {
          const className = clsx([
            row.getValue().startsWith('+') && 'text-m-green-6',
            row.getValue().startsWith('-') && 'text-m-red-6',
            row.getValue().startsWith('0') && 'text-m-blue-6',
          ]);

          return <span className={className}>{row.getValue()}</span>;
        },
      }),
    ];
  }, []);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="rounded-m-lg bg-m-night-7 p-2">
      <div className="scrollbar scrollbar-thumb-m-night-0 scrollbar-track-m-night-7 h-[calc(100svh-400px)] overflow-y-auto">
        <div>
          <h3 className="text-center text-lg font-bold">{riverData[0].parametertype_name}</h3>
        </div>
        <table className="w-full table-fixed bg-m-night-7 text-m-sm">
          <thead className="sticky top-0 bg-m-night-7">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border-b border-b-m-night-1 p-2 text-start">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border-b border-b-m-night-1 p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewRiverTable;
