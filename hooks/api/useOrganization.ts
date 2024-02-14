import { API_DOMAIN } from "@/utils/constants"
import axios from "axios"
import { useState } from "react"

export const useOrganization = () => {
    const [isLoading, setIsLoading] = useState(false)

    const getOrganization = async (org: string) => {
        // get organization by org name
        setIsLoading(true)
        return axios.get(`${API_DOMAIN}/api/github/org/${org}`).finally(() => {
            setIsLoading(false)
        })
    }

    const getOrganizations = async (data: string[]) => {
        // get organizations by a list of dictionary org name
        setIsLoading(true)
        const query = data.join(',')
        return axios.get(`${API_DOMAIN}/api/github/get_organizations?query=${query}`)
            .then((response: any) => {
                return response.data
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return {getOrganization, getOrganizations, isLoading}
}