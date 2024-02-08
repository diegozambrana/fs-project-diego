'use client';

import { Box, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchModalForm from './SearchModalForm';

export default function SearchModal(){
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Enter Github url">
        <SearchModalForm onClose={close} />
      </Modal>
      <Button onClick={open}>Add Repository</Button>
    </Box>
  )
}