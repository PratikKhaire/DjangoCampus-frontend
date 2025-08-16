import { apiClient } from '@/lib/api'
import { NewsletterSubscription, ApiResponse } from '@/types/api'

export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(subscription: NewsletterSubscription): Promise<NewsletterSubscription> {
    try {
      const response: ApiResponse<NewsletterSubscription> = await apiClient.post('/newsletter/subscribe/', subscription)
      return response.data!
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      throw error
    }
  },

  // Unsubscribe from newsletter
  async unsubscribe(email: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.post('/newsletter/unsubscribe/', { email })
      return response
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error)
      throw error
    }
  }
}
