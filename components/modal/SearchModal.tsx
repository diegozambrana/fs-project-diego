'use client';

import { Box, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SearchModalForm from './SearchModalForm';
import SearchModalFormOrg from './SearchModalFormOrg';
import SearchModalFormPackage from './SearchModalFormPackage';

interface SearchModalProps {
  typeData: "repo" | "org" | "package";
}

export default function SearchModal({typeData}: SearchModalProps){
  const [opened, { open, close }] = useDisclosure(false);
  const button_text = typeData === "repo" ? "Search Repository"
    : typeData === "org" ? "Search Organization"
    : "Search Package";

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Enter Github url">
        {typeData === "repo"
          ? <SearchModalForm onClose={close} />
          : typeData === "org" ? <SearchModalFormOrg onClose={close} />
          : <SearchModalFormPackage onClose={close} />
        }
      </Modal>
      <Button onClick={open}>{button_text}</Button>
    </Box>
  )
}