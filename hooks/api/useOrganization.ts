import axios from "axios"
import { useState } from "react"

export const useOrganization = () => {
    const [isLoading, setIsLoading] = useState(false)

    const getOrganization = async (org: string) => {
        setIsLoading(true)
        return axios.get(`/api/github/org/${org}`).finally(() => {
            setIsLoading(false)
        })
    }

    const getOrganizations = async (data: string[]) => {
        setIsLoading(true)
        const query = data.join(',')
        return axios.get(`/api/github/get_organizations?query=${query}`)
            .then((response: any) => {
                return response.data
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return {getOrganization, getOrganizations, isLoading}
}