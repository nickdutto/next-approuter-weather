import { z } from 'zod';

export const TomorrowIOTimelinesValidator = z.object({
  data: z.object({
    timelines: z.array(
      z.object({
        timestep: z.string(),
        endTime: z.string(),
        startTime: z.string(),
        intervals: z.array(
          z.object({
            startTime: z.string(),
            values: z.object({
              cloudBase: z.number().optional().nullable(),
              cloudCeiling: z.number().optional().nullable(),
              cloudCover: z.number().optional().nullable(),
              dewPoint: z.number().optional().nullable(),
              freezingRainIntensity: z.number().optional().nullable(),
              humidity: z.number().optional().nullable(),
              iceAccumulation: z.number().optional().nullable(),
              precipitationIntensity: z.number().optional().nullable(),
              precipitationProbability: z.number().optional().nullable(),
              precipitationType: z.number().optional().nullable(),
              pressureSeaLevel: z.number().optional().nullable(),
              pressureSurfaceLevel: z.number().optional().nullable(),
              rainAccumulation: z.number().optional().nullable(),
              rainIntensity: z.number().optional().nullable(),
              sleetAccumulation: z.number().optional().nullable(),
              sleetIntensity: z.number().optional().nullable(),
              snowAccumulation: z.number().optional().nullable(),
              snowIntensity: z.number().optional().nullable(),
              temperature: z.number().optional().nullable(),
              temperatureApparent: z.number().optional().nullable(),
              uvHealthConcern: z.number().optional().nullable(),
              uvIndex: z.number().optional().nullable(),
              visibility: z.number().optional().nullable(),
              weatherCode: z.number().optional().nullable(),
              windDirection: z.number().optional().nullable(),
              windGust: z.number().optional().nullable(),
              windSpeed: z.number().optional().nullable(),
            }),
          }),
        ),
      }),
    ),
  }),
});

export type TomorrowIOTimelines = z.infer<typeof TomorrowIOTimelinesValidator>;
export type TomorrowIOTimeline = z.infer<
  typeof TomorrowIOTimelinesValidator
>['data']['timelines'][number]['intervals'][number];
