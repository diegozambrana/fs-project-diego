'use client';

import { Box, Button, Modal, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {IconQuestionMark} from '@tabler/icons-react';

export default function Help({content}: {content: React.ReactNode}){
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <Box>
        <Modal opened={opened} onClose={close} size="lg" title="Help">
          <Box mb="1rem">
            {content}
          </Box>
          <Box ta="right">
            <Button onClick={close}>Close</Button>
          </Box>
        </Modal>

        <ActionIcon variant="default" radius="xl" aria-label="Settings" onClick={open}>
          <IconQuestionMark style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Box>
    )
}