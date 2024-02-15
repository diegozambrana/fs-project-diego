import { ActionIcon, Box, Flex, Image } from "@mantine/core"
import { IconExternalLink, IconEye, IconEyeOff, IconX } from "@tabler/icons-react"
import { FC } from "react"

interface ElementType {
  name: string,
  html_url: string,
  visible: boolean,
  avatar_url?: string,
}

interface DashboardElementType{
  element: ElementType,
  onToggleVisibility: (e: ElementType) => void,
  onRemove: (e: ElementType) => void,
}

export const DashboardElement: FC<DashboardElementType> = ({
  element,
  onToggleVisibility,
  onRemove,
}) => {
  return (
    <Box
      p="0.5rem"
      mb="0.5rem"
      key={`pack-${element.name}`}
      style={{border: '1px solid #e1e1e1', borderRadius: '5px'}}
    >
      <Flex justify="space-between">
        {element?.avatar_url && (
          <Box>
            <Image
              src={element.avatar_url}
              h="1.5rem"
              radius="md"
              alt={element.name}
            />
          </Box>
        )}
        <Box>
          {element.name}
        </Box>
        <Box>
          <a href={element.html_url} target="_blank" rel="noreferrer">
            <ActionIcon
              mr="0.2rem"
              variant="default"
              radius="xl"
              aria-label="Settings"
            >
              <IconExternalLink style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </a>
          <ActionIcon
            mr="0.2rem"
            variant="default"
            radius="xl"
            aria-label="Settings"
            onClick={() => onToggleVisibility(element)}
          >
            {element.visible ? (
              <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
            ) : (
              <IconEyeOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
            )}
          </ActionIcon>
          <ActionIcon
            variant="default"
            radius="xl"
            aria-label="Settings"
            onClick={() => onRemove(element)}
          >
            <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Box>
      </Flex>
    </Box>
  )
}