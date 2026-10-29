import { escapeHtml } from "../utils/helpers.js";

export function showLoading(el) {
  el.innerHTML = `
    <div class="flex flex-col items-center gap-3 py-16" role="status">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      <p class="text-sm text-slate-500">Loading employees…</p>
    </div>`;
}

export function showError(el, message) {
  el.innerHTML = `
    <div class="py-16 text-center" role="alert">
      <p class="font-semibold text-red-600">Something went wrong</p>
      <p class="mt-1 text-sm text-slate-500">${escapeHtml(message)}</p>
      <button id="retry-btn" type="button"
        class="mt-4 rounded bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
        Retry
      </button>
    </div>`;
}

export function showEmpty(el) {
  el.innerHTML = `
    <div class="py-16 text-center">
      <p class="font-medium">No employees found</p>
      <p class="mt-1 text-sm text-slate-500">Try changing your search or filters.</p>
    </div>`;
}
