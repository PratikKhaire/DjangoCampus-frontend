import { apiClient } from '@/lib/api'
import { TeamMember, ApiResponse } from '@/types/api'

export const teamService = {
  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const response = await apiClient.get('/teams/')
      if (response.results) {
        return response.results
      }
      return response
    } catch (error) {
      console.error('Error fetching team members:', error)
      return []
    }
  },

  async getTeamMember(id: number): Promise<TeamMember | null> {
    try {
      const response = await apiClient.get(`/teams/${id}/`)
      return response
    } catch (error) {
      console.error('Error fetching team member:', error)
      return null
    }
  }
}
