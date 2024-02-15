'use client';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchModalForm from './SearchModalForm';
import { IconPlus } from "@tabler/icons-react";

export default function AddNew(){
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add new Repository">
        <SearchModalForm
          onClose={close}
        />
      </Modal>
      <Button
        fullWidth
        ml="0.25rem"
        size="sm"
        variant="filled"
        leftSection={<IconPlus size={14} />}
        onClick={open}
      >Add Repository</Button>
    </>
  )
}