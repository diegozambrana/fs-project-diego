'use client';
import { getRepository } from "@/hooks/api/repository";
import { validateGitHubOrg, validateGitHubRepo } from "@/utils/validator";
import { Box, Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form"
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications';
import { useRepository } from "@/hooks/api/useRepository";

interface SearchModalFormProps {
  onClose: () => void;
  typeData: "repo" | "org";
}

/* 
* SearchModalForm
* This is a form to search a repository or library to compare.
*/
export default function SearchModalForm({onClose, typeData}: SearchModalFormProps) {
  const { getRepository, isLoading } = useRepository();
  const form = useForm({
    initialValues: {
      repository: "",
    },
    validate: {
      repository: (value: string) => value.length === 0
        ? "This field is required"
        : value.length <= 3 ? "This field is too short"
        : typeData === 'repo' && !validateGitHubRepo(value) ? "Invalid data"
        : typeData === 'org' && !validateGitHubOrg(value) ? "Invalid data"
        : null
    },
  });
  const router = useRouter()

  const placeholder_text = typeData === "repo"
    ? `"facebook/react" or "https://github.com/facebook/react"`
    : `"facebook" or "https://github.com/facebook"`;

  const label = typeData === "repo" ? "Repository" : "Organization";
  
  
  const onSubmit = async (values: any) => {
    const repoSplit = values.repository.split("/")
    const owner = repoSplit.at(-2)
    const repoName = repoSplit.at(-1)

    // Fetch the repository to verify if exists and redirect to compareRepo page
    if(!isLoading){
      getRepository(owner, repoName).then((res: any) => {
        router.push(`/compareRepo/${owner}@${repoName}`);
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
      {typeData === "repo" && (
        <>
          <Text my="1rem">
            Copy the URL of the github repository or the owner and repository name.
          </Text> 
          <Text my="1rem" size="sm">
            <strong>Example: </strong><br />
            &quot;`facebook/react&quot;` or &quot;`https://github.com/facebook/react&quot;`
          </Text>
        </>
      )}
      {typeData === "org" && (
        <>
          <Text my="1rem">
            Copy the URL of the github account or the owner name.
          </Text> 
          <Text my="1rem" size="sm">
            <strong>Example: </strong><br />
            `&quot;`facebook`&quot;` or `&quot;`https://github.com/facebook`&quot;`
          </Text>
        </>
      )}
      <form onSubmit={
        form.onSubmit(onSubmit)}>
        <Box my="1rem">
          <TextInput
            label={label}
            placeholder={placeholder_text}
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