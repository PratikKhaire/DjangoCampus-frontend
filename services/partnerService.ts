import { apiClient } from '@/lib/api'

export interface Partner {
  id: number
  name: string
  description: string
  logo: string
  website: string
  tier: number
  tier_name: string
  tier_badge_color: string
  partner_type: number
  partner_type_name: string
  partnership_date: string
  is_active: boolean
}

export interface PartnersResponse {
  count: number
  next: string | null
  previous: string | null
  results: Partner[]
}

export async function getPartners(): Promise<PartnersResponse> {
  try {
    return await apiClient.get('/partners/')
  } catch (error) {
    console.error('Error fetching partners:', error)
    throw error
  }
}

export async function getPartner(id: number): Promise<Partner> {
  try {
    return await apiClient.get(`/partners/${id}/`)
  } catch (error) {
    console.error(`Error fetching partner ${id}:`, error)
    throw error
  }
}
