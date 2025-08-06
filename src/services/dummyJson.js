// Updated API base URL
const BASE_URL = 'https://dummyjson.com';

// Fetch paginated users
export const fetchUsers = async (limit = 10, skip = 0) => {
  const response = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// Fetch single user by ID
export const fetchUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }
  return response.json();
};

// Search users by query
export const searchUsers = async (query) => {
  const response = await fetch(`${BASE_URL}/users/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search users');
  }
  return response.json();
};