'use client';
import { validateGitHubOrg } from "@/utils/validator";
import { Box, Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form"
import { notifications } from '@mantine/notifications';
import { useContext } from "react";
import { DashboardOrganizationContext } from "../dashboardOrganization/DashboardContext";
import { useOrganization } from "@/hooks/api/useOrganization";

interface SearchModalFormProps {
  onClose: () => void;
}

/* 
* SearchModalFormOrg
* This is a form to search a organization.
*/
export default function SearchModalFormOrg({
  onClose,
}: SearchModalFormProps) {
  const { getOrganization, isLoading } = useOrganization();
  const { addOrganization } = useContext(DashboardOrganizationContext)
  const form = useForm({
    initialValues: {
      organization: "",
    },
    validate: {
      organization: (value: string) => value.length === 0
        ? "This field is required"
        : value.length <= 2 ? "This field is too short"
        : !validateGitHubOrg(value) ? "Invalid data"
        : null
    },
  });

  
  
  const onSubmit = async (value: any) => {
    const organizationName = value.organization.split('/').at(-1)
    

    // Fetch the organization to verify if exists and display the organization dashboard
    if(!isLoading){
      getOrganization(organizationName).then((res: any) => {
        addOrganization(res.data);
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
        Copy the URL of the github account or the owner name.
      </Text> 
      <Text my="1rem" size="sm">
        <strong>Example: </strong><br />
        &quot;facebook&quot; or &quot;https://github.com/facebook&quot;
      </Text>
      <form onSubmit={
        form.onSubmit(onSubmit)}>
        <Box my="1rem">
          <TextInput
            label={'Organization'}
            placeholder={`"facebook" or "https://github.com/facebook"`}
            {...form.getInputProps('organization')}
          />
        </Box>
        <Box ta="right">
          <Button mr="1rem" color="gray" onClick={onClose}>Cancel</Button>
          <Button type="submit">Search</Button>
        </Box>
      </form>
    </Box>
  )
}