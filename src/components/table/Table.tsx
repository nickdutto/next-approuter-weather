'use client';

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

type Props<T extends object> = {
  title?: string;
  data: T[];
  //! see https://github.com/TanStack/table/issues/4382
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
};

const Table = <T extends object>({ title, data, columns }: Props<T>) => {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="rounded-m-lg bg-m-night-7 p-2">
      <div className="h-[calc(100svh-400px)] overflow-y-auto scrollbar scrollbar-track-m-night-7 scrollbar-thumb-m-night-0">
        {title && (
          <div>
            <h3 className="text-center text-lg font-bold">{title}</h3>
          </div>
        )}
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

export default Table;
