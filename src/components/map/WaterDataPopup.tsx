'use client';

import { Button, Loader, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import Link from 'next/link';
import { WiFlood, WiSandstorm } from 'react-icons/wi';
import { z } from 'zod';

import { type PopupInfo } from '~/components/map/Popup';

type Props = {
  popupInfo: PopupInfo;
};

const WaterDataPopup = ({ popupInfo }: Props) => {
  const { data: discharge, status: dischargeStatus } = useQuery({
    queryKey: [`water-data-latest-discharge-${popupInfo.dischargeId}`],
    queryFn: async () => {
      const res = await fetch(
        `/api/bom/waterdata/latest?ts_id=${popupInfo.dischargeId}&timezone=${popupInfo.timezone}`,
        {
          method: 'GET',
        },
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = z
        .object({
          timestamp: z.string().nullable(),
          value: z.number().nullable(),
        })
        .parse(await res.json());

      return data;
    },
    retry: 1,
  });

  const { data: level, status: levelStatus } = useQuery({
    queryKey: [`water-data-latest-level-${popupInfo.levelId}`],
    queryFn: async () => {
      const res = await fetch(
        `/api/bom/waterdata/latest?ts_id=${popupInfo.levelId}&timezone=${popupInfo.timezone}`,
        {
          method: 'GET',
        },
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = z
        .object({
          timestamp: z.string().nullable(),
          value: z.number().nullable(),
        })
        .parse(await res.json());

      return data;
    },
    retry: 1,
  });

  return (
    <div className="flex flex-col gap-0.5 p-0.5">
      <div className="text-center">
        <Title order={3} size="h6" c="gray.3">
          {popupInfo.title}
        </Title>
        {popupInfo?.subTitle && (
          <Text fw={600} c="gray.6" className="text-[10px]">
            {popupInfo.subTitle}
          </Text>
        )}
      </div>
      <div className="flex flex-col py-1">
        <div className="inline-flex items-center gap-1">
          <span className="inline-flex items-center text-[10px] font-semibold">
            <WiSandstorm size={26} />:
          </span>{' '}
          <Text fw={600} className="text-[12px]">
            {dischargeStatus === 'pending' && <Loader color="blue" size="xs" type="dots" />}{' '}
            {dischargeStatus === 'success' && discharge.value !== null && (
              <>
                {discharge.value.toFixed(3)} <span className="text-[10px]">m3/s</span>
              </>
            )}
            {dischargeStatus === 'success' && discharge.value === null && 'Unavailable'}
            {dischargeStatus === 'error' && 'Unavailable'}
          </Text>
        </div>
        <div className="inline-flex items-center gap-1">
          <span className="inline-flex items-center text-[10px] font-semibold">
            <WiFlood size={26} />:
          </span>{' '}
          <Text fw={600} className="text-[12px]">
            {levelStatus === 'pending' && <Loader color="blue" size="xs" type="dots" />}{' '}
            {levelStatus === 'success' && level.value !== null && (
              <>
                {level.value.toFixed(3)} <span className="text-[10px]">m</span>
              </>
            )}
            {levelStatus === 'success' && level.value === null && 'Unavailable'}
            {levelStatus === 'error' && 'Unavailable'}
          </Text>
        </div>
      </div>
      {popupInfo?.href && (
        <Button
          component={Link}
          href={popupInfo.href}
          variant="light"
          size="compact-xs"
          fullWidth
          color="blue.7"
          classNames={{
            root: 'focus-visible:!outline-none',
          }}
        >
          Open
        </Button>
      )}
    </div>
  );
};

export default WaterDataPopup;
