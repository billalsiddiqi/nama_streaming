export const API_BASE = 'http://nama.test/api' // or your deployed URL


export async function fetchByGenre() {
  try {
    const res = await fetch(`${API_BASE}/movies`)
    const data = await res.json()
    return data
  } catch (err) {
    console.error('Failed to fetch categories with movies', err)
    return []
  }
}

  export async function fetchCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`)
      const data = await res.json()
      return data
    } catch (err) {
      console.error('Failed to fetch categories with movies', err)
      return []
    }
  }