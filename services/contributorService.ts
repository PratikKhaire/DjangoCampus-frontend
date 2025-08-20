import { apiClient } from '@/lib/api'

export interface Contributor {
  id: number
  full_name: string
  role: number
  role_name: string
  role_badge_color: string
  photo: string
  bio: string
  achievements: string
  linkedin: string | null
  github: string | null
  twitter: string | null
  website: string | null
  email: string | null
  is_active: boolean
}

export interface ContributorsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Contributor[]
}

export async function getContributors(): Promise<ContributorsResponse> {
  try {
    return await apiClient.get('/contributors/')
  } catch (error) {
    console.error('Error fetching contributors:', error)
    throw error
  }
}

export async function getContributor(id: number): Promise<Contributor> {
  try {
    return await apiClient.get(`/contributors/${id}/`)
  } catch (error) {
    console.error(`Error fetching contributor ${id}:`, error)
    throw error
  }
}
