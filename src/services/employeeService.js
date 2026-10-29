import { fetchUsers } from "../api/employeeApi.js";
import { DEPARTMENTS, JOB_TITLES, STORAGE_KEYS } from "../js/constants.js";
import { session } from "../storage/storage.js";

function toEmployee(user, index) {
  const department = DEPARTMENTS[index % DEPARTMENTS.length];
  const titles = JOB_TITLES[department];
  return {
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    title: titles[Math.floor(index / DEPARTMENTS.length) % titles.length],
    department,
    availability: index % 5 === 1 ? "Out" : "Available",
    phone: user.phone,
    mobile: user.cell,
    email: user.email,
    photo: user.picture.medium,
    office: user.location.city,
    gender: user.gender === "male" ? "Male" : "Female",
    birthday: new Date(user.dob.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    }),
  };
}

export async function getEmployees() {
  // Optimize API requests: reuse data already fetched in this tab
  const cached = session.get(STORAGE_KEYS.cache);
  if (cached) return cached;

  const users = await fetchUsers(30);
  const employees = users.map(toEmployee);

  // Supervisor = another employee in the same department
  employees.forEach((emp) => {
    const boss = employees.find(
      (e) => e.department === emp.department && e.id !== emp.id,
    );
    emp.supervisor = boss ? boss.name : "—";
  });

  session.set(STORAGE_KEYS.cache, employees);
  return employees;
}
