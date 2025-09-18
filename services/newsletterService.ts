import { apiClient } from '@/lib/api'
import { NewsletterSubscription, ApiResponse } from '@/types/api'

// Define a custom error class for duplicate subscription
export class DuplicateSubscriptionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DuplicateSubscriptionError'
  }
}

export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(subscription: NewsletterSubscription): Promise<NewsletterSubscription> {
    try {
      // Using apiClient.post for consistency with other services
      // Note: Django requires a trailing slash for POST endpoints
      const response = await apiClient.post('/subscribers/', {
        name: subscription.name || "Subscriber", // Fallback name if not provided
        email: subscription.email
      })
      
      return response
    } catch (error: any) {
      // Check if this is a duplicate email error
      // The error message comes as a string that needs to be parsed
      if (error.message && error.message.includes('already exists')) {
        throw new DuplicateSubscriptionError(
          "You're already subscribed to our newsletter! We'll keep you updated with our latest workshops."
        )
      }
      
      // Try to parse the error message to check for duplicate email
      try {
        // The error may be in the format: API Error: 400 Bad Request - {"email":["Newsletter Subscriber with this Email Address already exists."]}
        const errorMessageMatch = error.message.match(/\{.*\}/);
        if (errorMessageMatch) {
          const errorJson = JSON.parse(errorMessageMatch[0]);
          if (errorJson.email && errorJson.email[0].includes('already exists')) {
            throw new DuplicateSubscriptionError(
              "You're already subscribed to our newsletter! We'll keep you updated with our latest workshops."
            )
          }
        }
      } catch (parseError) {
        // If parsing fails, continue with the original error
        console.error('Error parsing error message:', parseError);
      }
      
      throw error
    }
  },

  // Unsubscribe from newsletter
  async unsubscribe(email: string): Promise<{ message: string }> {
    try {
      // Note: Django requires a trailing slash for POST endpoints
      const response = await apiClient.post('/subscribers/unsubscribe/', { 
        email 
      })
      return response
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error)
      throw error
    }
  }
}
