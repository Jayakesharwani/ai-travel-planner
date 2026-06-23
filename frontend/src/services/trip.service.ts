const API_URL = "https://ai-travel-planner-ai.onrender.com/api/trips";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getTrips() {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  return response.json();
}

export async function getTrip(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.json();
}

export async function createTrip(data: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function generateTrip(id: string) {
  const response = await fetch(
    `${API_URL}/${id}/generate`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );

  return response.json();
}

export async function regenerateDay(
  id: string,
  day: number
) {
  const response = await fetch(
    `${API_URL}/${id}/regenerate-day`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ day }),
    }
  );

  return response.json();
}

export async function updateActivities(
  id: string,
  itinerary: any
) {
  const response = await fetch(
    `${API_URL}/${id}/activity`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        itinerary,
      }),
    }
  );

  return response.json();
}

export async function deleteTrip(id: string) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  return response.json();
}