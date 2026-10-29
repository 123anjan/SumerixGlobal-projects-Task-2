const BASE_URL = "https://randomuser.me/api/";

export async function fetchUsers(count = 30) {
  const params = new URLSearchParams({
    results: count,
    seed: "sumerix", // same seed = same people every time
    nat: "us,gb,au",
    inc: "login,name,email,phone,cell,picture,location,dob,gender",
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Request failed (HTTP ${response.status})`);
  }
  const data = await response.json();
  return data.results;
}
