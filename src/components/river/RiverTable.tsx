import { formatInTimeZone } from 'date-fns-tz';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { type MergedRiverData } from '~/utils/river-utils';

type Props = {
  riverData: MergedRiverData;
};

const RiverTable = ({ riverData }: Props) => {
  return (
    <Table className="rounded-md bg-zinc-950">
      <TableHeader>
        <TableRow className="bg-zinc-900/20">
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead className="text-center">Discharge (cumec)</TableHead>
          <TableHead className="text-center">Level (m)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-gray-300">
        {riverData.reverse().map((data) => (
          <TableRow key={data.date}>
            <TableCell className="text-center text-xs">
              {formatInTimeZone(data.date, 'Australia/Canberra', 'dd/MM/yy')}
            </TableCell>
            <TableCell className="text-center text-xs">
              {formatInTimeZone(data.date, 'Australia/Canberra', 'HH:mm')}
            </TableCell>
            <TableCell className="text-center text-xs">{data.discharge}</TableCell>
            <TableCell className="text-center text-xs">{data.level}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RiverTable;
