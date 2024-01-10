import { z } from 'zod';

export const WaterDataColumn = z.array(z.union([z.string(), z.number(), z.null()]));

export const WaterDataValidator = z.object({
  station_longname: z.string().optional(),
  station_no: z.coerce.number().optional(),
  station_latitude: z.coerce.number().optional(),
  station_longitude: z.coerce.number().optional(),
  parametertype_name: z.string().optional(),
  ts_id: z.coerce.number().optional(),
  ts_name: z.string().optional(),
  ts_unitname: z.string().optional(),
  DATA_OWNER_NAME: z.string().optional(),
  rows: z.coerce.number().optional(),
  columns: z.string().optional(),
  data: z.array(WaterDataColumn),
});

export const WaterDataResValidator = z.array(WaterDataValidator);

export type WaterData = z.infer<typeof WaterDataValidator>;
