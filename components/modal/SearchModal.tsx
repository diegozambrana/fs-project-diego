'use client';

import { Box, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchModalForm from './SearchModalForm';
import SearchModalFormOrg from './SearchModalFormOrg';

interface SearchModalProps {
  typeData: "repo" | "org";
}

export default function SearchModal({typeData}: SearchModalProps){
  const [opened, { open, close }] = useDisclosure(false);
  const button_text = typeData === "repo" ? "Add Repository" : "Search Organization";

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Enter Github url">
        {typeData === "repo"
          ? <SearchModalForm onClose={close} typeData={typeData} />
          : <SearchModalFormOrg onClose={close} />
        }
      </Modal>
      <Button onClick={open}>{button_text}</Button>
    </Box>
  )
}