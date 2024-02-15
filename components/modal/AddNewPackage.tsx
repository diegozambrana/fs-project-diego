'use client';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from "@tabler/icons-react";
import SearchModalFormPackage from './SearchModalFormPackage';


export default function AddNewPackage(){
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add new Package">
        <SearchModalFormPackage
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
      >Add Package</Button>
    </>
  )
}