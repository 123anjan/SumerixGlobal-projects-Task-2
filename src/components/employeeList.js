import { escapeHtml } from "../utils/helpers.js";

export function renderList(el, employees, { favorites, selectedId }) {
  el.innerHTML = `
    <ul class="divide-y divide-slate-200 dark:divide-slate-700">
      ${employees
        .map((e) => {
          const isFav = favorites.has(e.id);
          const isSelected = e.id === selectedId;
          const statusColor =
            e.availability === "Available" ? "text-teal-600" : "text-red-600";
          return `
        <li class="flex items-center ${isSelected ? "bg-slate-50 dark:bg-slate-700/50" : ""}">
          <button type="button" data-select="${e.id}" aria-current="${isSelected}"
            class="grid flex-1 grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal-500 sm:grid-cols-[2fr_1fr_1fr_1fr] dark:hover:bg-slate-700/50">
            <span class="flex items-center gap-3">
              <img src="${e.photo}" alt="" width="40" height="40" loading="lazy" class="h-10 w-10 rounded-full object-cover" />
              <span>
                <span class="block text-sm font-medium">${escapeHtml(e.name)}</span>
                <span class="block text-xs text-slate-500">${escapeHtml(e.title)}</span>
              </span>
            </span>
            <span class="hidden text-sm sm:block">${escapeHtml(e.department)}</span>
            <span class="hidden text-sm sm:block">${escapeHtml(e.phone)}</span>
            <span class="text-sm font-medium ${statusColor}">● ${e.availability}</span>
          </button>
          <button type="button" data-fav="${e.id}" aria-pressed="${isFav}"
            aria-label="${isFav ? "Remove" : "Add"} ${escapeHtml(e.name)} ${isFav ? "from" : "to"} favorites"
            class="px-4 py-3 text-xl focus-visible:outline-2 focus-visible:outline-teal-500 ${isFav ? "text-amber-400" : "text-slate-300"}">
            ${isFav ? "★" : "☆"}
          </button>
        </li>`;
        })
        .join("")}
    </ul>`;
}
