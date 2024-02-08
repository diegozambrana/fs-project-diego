'use client';
import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form"

/* 
* SearchModalForm
* This is a form to search a repository or library to compare.
*/
export default function SearchModalForm({onClose}: {onClose: () => void}) {
  const form = useForm({
    initialValues: {
      repository: "",
    },
    validate: {
      repository: (value: string) => value.length === 0
        ? "This field is required"
        : value.length <= 3 ? "This field is too short"
        : null
    },
  });

  const onSubmit = (values: any) => {
    console.log(values)
    onClose()
    // TODO: Search repository and redirect to /compare
  }

  return (
    <Box>
      <form onSubmit={
        form.onSubmit(onSubmit)}>
        <Box my="1rem">
          <TextInput
            label="Repository"
            placeholder={`"facebook/react" or "https://github.com/facebook/react"`}
            {...form.getInputProps('repository')}
          />
        </Box>
        <Box ta="right">
          <Button type="submit">Search</Button>
        </Box>
      </form>
    </Box>
  )
}