'use client';
import { validateGitHubOrg, validateGitHubRepo } from "@/utils/validator";
import { Box, Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form"
import { notifications } from '@mantine/notifications';
import { useRepository } from "@/hooks/api/useRepository";
import { useContext } from "react";
import { DashboardRepositoryContext } from "../dashboardRepository/DashboardContext";

interface SearchModalFormProps {
  onClose: () => void;
}

/* 
* SearchModalForm
* This is a form to search a repository or library to compare.
*/
export default function SearchModalForm({
  onClose,
}: SearchModalFormProps) {
  const { getRepository, isLoading } = useRepository();
  const { addRepository } = useContext(DashboardRepositoryContext)
  const form = useForm({
    initialValues: {
      repository: "",
    },
    validate: {
      repository: (value: string) => value.length === 0
        ? "This field is required"
        : value.length <= 3 ? "This field is too short"
        : !validateGitHubRepo(value) ? "Invalid data"
        : null
    },
  });
  
  const onSubmit = async (values: any) => {
    const repoSplit = values.repository.split("/")
    const owner = repoSplit.at(-2)
    const repoName = repoSplit.at(-1)

    // Fetch the repository to verify if exists and redirect to compareRepo page
    if(!isLoading){
      getRepository(owner, repoName).then((res: any) => {
        addRepository(res.data);
        onClose();
      }).catch((err: any) => {
        notifications.show({
          title: 'Error',
          message: err.response.data.detail,
          color: 'red',
        })
      })
    }
  }

  return (
    <Box>
      <Text my="1rem">
        Copy the URL of the github repository or the owner and repository name.
      </Text> 
      <Text my="1rem" size="sm">
        <strong>Example: </strong><br />
        &quot;nixtla/statsforecast&quot; or &quot;https://github.com/nixtla/statsforecast&quot;
      </Text>
      <form onSubmit={
        form.onSubmit(onSubmit)}>
        <Box my="1rem">
          <TextInput
            label={'Repository'}
            placeholder={`"nixtla/statsforecast" or "https://github.com/nixtla/statsforecast"`}
            {...form.getInputProps('repository')}
          />
        </Box>
        <Box ta="right">
          <Button mr="1rem" color="gray" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Searching' : 'Search'}</Button>
        </Box>
      </form>
    </Box>
  )
}