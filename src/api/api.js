const API_URL = "http://localhost:5000"

export const apiFetch = async (endpoint, options = {}) => {

  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}${endpoint}`, {

    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },

    ...options

  })

  if (!response.ok) {

    const error = await response.json()

    throw new Error(error.message || "Erreur API")

  }

  return response.json()

}