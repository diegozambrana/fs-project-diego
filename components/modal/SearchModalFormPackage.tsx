'use client';
import { Box, Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form"
import { notifications } from '@mantine/notifications';
// import { useRepository } from "@/hooks/api/useRepository";
import { useContext } from "react";
import { DashboardPackagesContext } from "../dashboardDownloads/DashboardContext";
import { usePackage } from "@/hooks/api/usePackage";

interface SearchModalFormProps {
  onClose: () => void;
}

/* 
* SearchModalForm
* This is a form to search a Package or library to compare.
*/
export default function SearchModalFormPackage({
  onClose,
}: SearchModalFormProps) {
  // const { getRepository, isLoading } = useRepository();
  const { getPackage, isLoading } = usePackage()
  const { addPackage } = useContext(DashboardPackagesContext)
  const form = useForm({
    initialValues: {
      package: "",
    },
    validate: {
      package: (value: string) => value.length === 0
        ? "This field is required"
        : value.length <= 2 ? "This field is too short"
        : null
    },
  });

  const onSubmit = async (values: any) => {
    const package_name = values.package
    console.log('onSubmit', values)

    // Fetch the Package to verify if exists and redirect to compareRepo page
    if(!isLoading){
      const res = await getPackage(package_name)
      if(res){
        addPackage(res);
        onClose();
      }
    }
  }

  return (
    <Box>

      <Text my="1rem">
        Copy the name of the package.
      </Text> 
      <Text my="1rem" size="sm">
        <strong>Example: </strong><br />
        &quot;pandas&quot; or &quot;nixtlats&quot;
      </Text>
      <form onSubmit={
        form.onSubmit(onSubmit)}>
        <Box my="1rem">
          <TextInput
            label={'Package'}
            placeholder={`"pandas" or "nixtlats"`}
            {...form.getInputProps('package')}
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