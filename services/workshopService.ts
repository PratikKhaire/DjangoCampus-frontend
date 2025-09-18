import { apiClient } from '@/lib/api'
import { Workshop, Registration, ApiResponse } from '@/types/api'

export const workshopService = {
  // Get all workshops
  async getWorkshops(): Promise<Workshop[]> {
    try {
      const response: ApiResponse<Workshop> = await apiClient.get('/workshops/')
      return response.results || []
    } catch (error) {
      throw error
    }
  },

  // Get upcoming workshops (not ended)
  async getUpcomingWorkshops(): Promise<Workshop[]> {
    try {
      const response: ApiResponse<Workshop> = await apiClient.get('/workshops/?is_ended=false')
      return response.results || []
    } catch (error) {
      throw error
    }
  },

  // Get workshop by ID
  async getWorkshop(id: number): Promise<Workshop> {
    try {
      const response: ApiResponse<Workshop> = await apiClient.get(`/workshops/${id}/`)
      return response.data!
    } catch (error) {
      throw error
    }
  },

  // Register for workshop
  async registerForWorkshop(registration: Registration): Promise<Registration> {
    try {
      const response: ApiResponse<Registration> = await apiClient.post('/workshops/register/', registration)
      return response.data!
    } catch (error) {
      throw error
    }
  },

  // Check registration status
  async checkRegistration(workshopId: number, email: string): Promise<boolean> {
    try {
      const response = await apiClient.get(`/workshops/${workshopId}/check-registration/?email=${email}`)
      return response.is_registered
    } catch (error) {
      return false
    }
  }
}
