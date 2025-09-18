import { apiClient } from '@/lib/api'
import { CommunityMember, ApiResponse } from '@/types/api'

export const communityService = {
  // Get community members/testimonials
  async getCommunityMembers(): Promise<CommunityMember[]> {
    try {
      const response: ApiResponse<CommunityMember> = await apiClient.get('/community/members/')
      return response.results || []
    } catch (error) {
      throw error
    }
  },

  // Get featured testimonials
  async getFeaturedTestimonials(): Promise<CommunityMember[]> {
    try {
      const response: ApiResponse<CommunityMember> = await apiClient.get('/community/testimonials/featured/')
      return response.results || []
    } catch (error) {
      throw error
    }
  }
}
