'use client';

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { type ComponentProps } from 'react';

import { cn } from '~/lib/utils';

type Props<T extends object> = {
  title?: string;
  data: T[];
  //! see https://github.com/TanStack/table/issues/4382
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  wrapperProps?: ComponentProps<'div'>;
  tableProps?: ComponentProps<'table'>;
  theadProps?: ComponentProps<'thead'>;
  tbodyProps?: ComponentProps<'tbody'>;
  thProps?: ComponentProps<'th'>;
  tdProps?: ComponentProps<'td'>;
};

const Table = <T extends object>({
  title,
  data,
  columns,
  wrapperProps,
  tableProps,
  theadProps,
  tbodyProps,
  thProps,
  tdProps,
}: Props<T>) => {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div
      {...wrapperProps}
      className={cn(
        'w-full overflow-y-auto rounded-m-lg bg-m-night-7 p-2 scrollbar scrollbar-track-m-night-7 scrollbar-thumb-m-night-0',
        wrapperProps?.className,
      )}
    >
      {title && (
        <div>
          <h3 className="text-center text-lg font-bold">{title}</h3>
        </div>
      )}
      <table
        {...tableProps}
        className={cn('table-fixed bg-m-night-7 text-m-sm', tableProps?.className)}
      >
        <thead
          {...theadProps}
          className={cn('sticky top-0 z-10 bg-m-night-7', theadProps?.className)}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn('border-b border-b-m-night-1 p-2 text-start', thProps?.className)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...tbodyProps}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={cn('border-b border-b-m-night-1 p-2', tdProps?.className)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
