import { escapeHtml } from "../utils/helpers.js";

const row = (label, value) => `
  <div class="flex justify-between gap-4 py-1 text-sm">
    <dt class="text-slate-500">${label}</dt>
    <dd class="text-right">${escapeHtml(value)}</dd>
  </div>`;

export function renderDetail(el, employee, favorites) {
  if (!employee) {
    el.innerHTML = `<p class="text-sm text-slate-500">Select an employee to see their details.</p>`;
    return;
  }
  const isFav = favorites.has(employee.id);
  el.innerHTML = `
    <div class="flex items-center gap-4">
      <img src="${employee.photo}" alt="${escapeHtml(employee.name)}" class="h-16 w-16 rounded-full object-cover" />
      <div>
        <h2 class="text-lg font-semibold">${escapeHtml(employee.name)}</h2>
        <p class="text-sm text-slate-500">${escapeHtml(employee.title)}</p>
        <p class="text-sm ${employee.availability === "Available" ? "text-teal-600" : "text-red-600"}">● ${employee.availability}</p>
      </div>
    </div>

    <h3 class="mt-6 border-t border-slate-200 pt-4 text-center text-sm font-semibold dark:border-slate-700">Contact Information</h3>
    <dl class="mt-2">
      ${row("Office Tel", employee.phone)}
      ${row("Mobile", employee.mobile)}
      ${row("Email", employee.email)}
    </dl>

    <h3 class="mt-4 border-t border-slate-200 pt-4 text-center text-sm font-semibold dark:border-slate-700">Work Information</h3>
    <dl class="mt-2">
      ${row("Department", employee.department)}
      ${row("Supervisor", employee.supervisor)}
      ${row("Office", employee.office)}
    </dl>

    <h3 class="mt-4 border-t border-slate-200 pt-4 text-center text-sm font-semibold dark:border-slate-700">Personal Information</h3>
    <dl class="mt-2">
      ${row("Sex", employee.gender)}
      ${row("Birthday", employee.birthday)}
      ${row("City", employee.office)}
    </dl>

    <button type="button" data-fav="${employee.id}" aria-pressed="${isFav}"
      class="mt-6 w-full rounded border border-teal-600 py-2 text-sm text-teal-600 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:hover:bg-slate-700">
      ${isFav ? "★ Remove from favorites" : "☆ Add to favorites"}
    </button>`;
}
