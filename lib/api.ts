const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://djangocampus.pythonanywhere.com/api'

export const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  },

  async post(endpoint: string, data: any) {
    const url = `${API_BASE_URL}${endpoint}`
    console.log('POST Request URL:', url)
    console.log('POST Request Data:', JSON.stringify(data, null, 2))
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    console.log('POST Response Status:', response.status)
    console.log('POST Response OK:', response.ok)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('POST Error Response:', errorText)
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`)
    }
    
    const responseData = await response.json()
    console.log('POST Response Data:', responseData)
    return responseData
  },

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  }
}
