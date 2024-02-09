'use client';
import { decoderRepos } from "@/utils/decoder";
import { useParams } from "next/navigation";
import { FC, use, useCallback, useEffect, useMemo, useState } from "react";
import { Grid, GridCol, Card, Box, ActionIcon, Button, Flex, Switch } from "@mantine/core";
import { IconEyeOff, IconExternalLink, IconX, IconDownload, IconPhoto, IconLink, IconEye, IconTrash, IconPlus } from "@tabler/icons-react";
import LineChart from "@/components/charts/LineChart";
import Help from "@/components/ui/Help";
// import { getRepository } from "@/hooks/api/repository";
import { useRepository } from "@/hooks/api/useRepository";
import { useRepositoryStarHistory } from "@/hooks/api/useStarData";


const CompareRepoPage: FC = () => {
  const { queryRepo } = useParams();
  const [ checked, setChecked ] = useState(false);
  const [ repositories, setRepositories ] = useState<any[]>([]);
  const { getRepository, isLoading } = useRepository()
  const { getRepositoryStarHistory, isLoading: isLoadingSH } = useRepositoryStarHistory()

  const data = useMemo(() => {
    return decoderRepos(queryRepo)
  }, [queryRepo])

  const getRepoStarHistory = useCallback(async (owner: string, repo_name: string) => {
    const response = await getRepositoryStarHistory(owner, repo_name)
  }, [getRepositoryStarHistory])

// disable EsLint
  useEffect(() => {
    if(!isLoading && repositories.length === 0 && data.length > 0){
      getRepository(data[0].owner, data[0].repo_name).then((res) => {
        setRepositories([...repositories, res.data]);
        getRepoStarHistory(data[0].owner, data[0].repo_name)
      });
    }
  }, [data, getRepository, getRepoStarHistory, isLoading, repositories]);
// enable EsLint
  return (
    <Card shadow="sm" padding="md" radius="md">
      <Box ta="right">
        <Help content={"Help Text"}/>
      </Box>
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <Box>
          <Button rightSection={<IconDownload size={14} />}>Download CSV</Button>
        </Box>
        <Box>
          <Button rightSection={<IconPhoto size={14} />}>Download PNG</Button>
        </Box>
        <Box>
          <Button rightSection={<IconLink size={14} />}>Share Link</Button>
        </Box>
      </Flex>
      <Grid mt="2rem">
        <GridCol span={8}>
          <LineChart />
        </GridCol>
        <GridCol span={4}>
          <Box>
            <Box my="1rem">
              <Switch
                label="Align Timeline"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
              />
            </Box>
            {repositories.map((repo, index) => (
              <Box
                p="0.5rem"
                mb="0.5rem"
                key={`${repo.owner}-${repo.name}`}
                style={{border: '1px solid #e1e1e1', borderRadius: '5px'}}
              >
                <Flex justify="space-between">
                  <Box>
                    {repo.name}
                  </Box>
                  <Box>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      <ActionIcon mr="0.2rem" variant="default" radius="xl" aria-label="Settings">
                        <IconExternalLink style={{ width: '70%', height: '70%' }} stroke={1.5} />
                      </ActionIcon>
                    </a>
                    <ActionIcon mr="0.2rem" variant="default" radius="xl" aria-label="Settings">
                      <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="default" radius="xl" aria-label="Settings">
                      <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                  </Box>
                </Flex>
              </Box>
            ))}

            <Box>
              <Flex justify="space-between">
                <Button fullWidth mr="0.25rem" size="sm" variant="filled" color="red" leftSection={<IconTrash size={14} />}>Clean</Button>
                <Button fullWidth ml="0.25rem" size="sm" variant="filled" leftSection={<IconPlus size={14} />}>Add New</Button>
              </Flex>
            </Box>
            
          </Box>
        </GridCol>
      </Grid>
    </Card>
  );
}

export default CompareRepoPage;