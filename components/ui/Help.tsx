'user client';
import {IconQuestionMark} from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

export default function Help() {
  return (
    <ActionIcon variant="default" radius="xl" aria-label="Settings">
      <IconQuestionMark style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}