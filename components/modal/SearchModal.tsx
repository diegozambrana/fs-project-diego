'use client';

import { Box, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchModalForm from './SearchModalForm';

interface SearchModalProps {
  typeData: "repo" | "org";
}

export default function SearchModal({typeData}: SearchModalProps){
  const [opened, { open, close }] = useDisclosure(false);
  const button_text = typeData === "repo" ? "Add Repository" : "Search Organization";

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Enter Github url">
        <SearchModalForm onClose={close} typeData={typeData} /> 
      </Modal>
      <Button onClick={open}>{button_text}</Button>
    </Box>
  )
}