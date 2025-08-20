import { apiClient } from '@/lib/api'

export interface Supporter {
  id: number
  name: string
  logo: string
  website: string
  contribution_type: string
  description: string
  support_date: string
  is_active: boolean
}

export interface SupportersResponse {
  count: number
  next: string | null
  previous: string | null
  results: Supporter[]
}

export async function getSupporters(): Promise<SupportersResponse> {
  try {
    return await apiClient.get('/supporters/')
  } catch (error) {
    console.error('Error fetching supporters:', error)
    throw error
  }
}

export async function getSupporter(id: number): Promise<Supporter> {
  try {
    return await apiClient.get(`/supporters/${id}/`)
  } catch (error) {
    console.error(`Error fetching supporter ${id}:`, error)
    throw error
  }
}
