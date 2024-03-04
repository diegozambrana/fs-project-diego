'use client';

import { Box, Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from "@tabler/icons-react";
import { useContext } from 'react';
import { DashboardPackagesContext } from '../dashboardDownloads/DashboardContext';


export default function CleanPackage() {
  const [opened, { open, close }] = useDisclosure(false);
  const {clean} = useContext(DashboardPackagesContext);

  const onClean = () => {
    clean();
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Clean Packages">
        <Text>Do you want to clean the Packages Download dashboard?</Text>
        <Box ta="right" mt="1rem">
          <Button mr="1rem" color="gray" onClick={close}>Cancel</Button>
          <Button color='red' variant='filled' onClick={onClean}>Clean</Button>
        </Box>
      </Modal>
      <Button
        fullWidth
        mr="0.25rem"
        size="sm"
        variant="filled"
        color="red"
        leftSection={<IconTrash size={14} />}
        onClick={open}
      >Clean</Button>
    </>
  );
}