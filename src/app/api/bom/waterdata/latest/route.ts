import { z } from 'zod';

import { getToFromDates } from '~/lib/utils';
import { WaterDataResValidator } from '~/lib/validators/WaterDataValidator';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tsId = z.coerce.number().parse(searchParams.get('ts_id'));
    const timezone = z.string().min(1).parse(searchParams.get('timezone'));

    const { fromDate, toDate } = getToFromDates(timezone, { days: 3 });

    const urlSearchParams = new URLSearchParams({
      service: 'kisters',
      type: 'queryServices',
      request: 'getTimeseriesValues',
      datasource: '0',
      format: 'json',
      returnfields: 'Timestamp,Value',
      from: fromDate,
      to: toDate,
      ts_id: tsId.toString(),
    });

    const res = await fetch(
      `http://www.bom.gov.au/waterdata/services?${urlSearchParams.toString()}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    ).then((res) => res.json());

    const waterData = WaterDataResValidator.parse(res);
    const latestWaterData = waterData[0].data.filter((data) => data[1] !== null).at(-1);

    return new Response(
      JSON.stringify({
        timestamp: latestWaterData?.[0] ?? null,
        value: latestWaterData?.[1] ?? null,
      }),
    );
  } catch {
    return new Response('Bad Request', {
      status: 400,
    });
  }
}
