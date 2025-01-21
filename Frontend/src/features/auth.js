export const validateToken = async (token) => {
  try {
    const response = await fetch('http://localhost:5000/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok; // Token is valid if response is ok, otherwise invalid
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};
