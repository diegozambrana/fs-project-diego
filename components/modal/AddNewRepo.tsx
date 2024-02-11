'use client';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchModalForm from './SearchModalForm';
import { IconPlus } from "@tabler/icons-react";

interface SearchModalProps {
  typeData: "repo" | "org";
}

export default function AddNew({typeData}: SearchModalProps){
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add new Github url">
        <SearchModalForm
          onClose={close}
          typeData={typeData}
        />
      </Modal>
      <Button
        fullWidth
        ml="0.25rem"
        size="sm"
        variant="filled"
        leftSection={<IconPlus size={14} />}
        onClick={open}
      >Add New</Button>
    </>
  )
}