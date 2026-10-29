import "./css/style.css";
import { getEmployees } from "./services/employeeService.js";
import { local, session } from "./storage/storage.js";
import { DEPARTMENTS, STORAGE_KEYS } from "./js/constants.js";
import { debounce } from "./utils/helpers.js";
import { renderList } from "./components/employeeList.js";
import { renderDetail } from "./components/detailPanel.js";
import { showLoading, showError, showEmpty } from "./components/stateViews.js";

const $ = (selector) => document.querySelector(selector);
const els = {
  list: $("#employee-list"),
  detail: $("#detail-panel"),
  count: $("#result-count"),
  search: $("#search"),
  department: $("#department"),
  availability: $("#availability"),
  sort: $("#sort"),
  favOnly: $("#favorites-only"),
  theme: $("#theme-toggle"),
};

const state = {
  employees: [],
  query: "",
  department: local.get(STORAGE_KEYS.department, "All"),
  availability: "All",
  sort: local.get(STORAGE_KEYS.sort, "az"),
  favoritesOnly: false,
  favorites: new Set(local.get(STORAGE_KEYS.favorites, [])),
  selectedId: session.get(STORAGE_KEYS.selected),
};

/* ---------- Dark mode ---------- */
function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  els.theme.setAttribute("aria-pressed", String(theme === "dark"));
  els.theme.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}
const savedTheme =
  local.get(STORAGE_KEYS.theme) ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
applyTheme(savedTheme);

els.theme.addEventListener("click", () => {
  const next = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  applyTheme(next);
  local.set(STORAGE_KEYS.theme, next);
});

/* ---------- Filtering + sorting ---------- */
function getVisible() {
  const q = state.query.trim().toLowerCase();
  const result = state.employees.filter(
    (e) =>
      e.name.toLowerCase().includes(q) &&
      (state.department === "All" || e.department === state.department) &&
      (state.availability === "All" || e.availability === state.availability) &&
      (!state.favoritesOnly || state.favorites.has(e.id)),
  );

  const sorters = {
    az: (a, b) => a.name.localeCompare(b.name),
    za: (a, b) => b.name.localeCompare(a.name),
    dept: (a, b) =>
      a.department.localeCompare(b.department) || a.name.localeCompare(b.name),
  };
  return result.sort(sorters[state.sort]);
}

function render() {
  const visible = getVisible();
  els.count.textContent = `${visible.length} employee${visible.length === 1 ? "" : "s"} found`;

  if (visible.length === 0) showEmpty(els.list);
  else renderList(els.list, visible, state);

  const selected = state.employees.find((e) => e.id === state.selectedId);
  renderDetail(els.detail, selected, state.favorites);
}

/* ---------- Actions ---------- */
function toggleFavorite(id) {
  state.favorites.has(id)
    ? state.favorites.delete(id)
    : state.favorites.add(id);
  local.set(STORAGE_KEYS.favorites, [...state.favorites]);
  render();
}

function selectEmployee(id) {
  state.selectedId = id;
  session.set(STORAGE_KEYS.selected, id);
  render();
}

/* ---------- Events ---------- */
els.search.addEventListener(
  "input",
  debounce((e) => {
    state.query = e.target.value;
    render();
  }),
);

els.department.addEventListener("change", (e) => {
  state.department = e.target.value;
  local.set(STORAGE_KEYS.department, state.department);
  render();
});

els.availability.addEventListener("change", (e) => {
  state.availability = e.target.value;
  render();
});

els.sort.addEventListener("change", (e) => {
  state.sort = e.target.value;
  local.set(STORAGE_KEYS.sort, state.sort);
  render();
});

els.favOnly.addEventListener("change", (e) => {
  state.favoritesOnly = e.target.checked;
  render();
});

// Event delegation for rows, stars and the retry button
els.list.addEventListener("click", (e) => {
  const fav = e.target.closest("[data-fav]");
  const sel = e.target.closest("[data-select]");
  if (fav) return toggleFavorite(fav.dataset.fav);
  if (sel) return selectEmployee(sel.dataset.select);
  if (e.target.closest("#retry-btn")) load();
});
els.detail.addEventListener("click", (e) => {
  const fav = e.target.closest("[data-fav]");
  if (fav) toggleFavorite(fav.dataset.fav);
});

/* ---------- Init ---------- */
function initFilters() {
  els.department.innerHTML = ["All", ...DEPARTMENTS]
    .map((d) => `<option value="${d}">${d}</option>`)
    .join("");
  els.department.value = state.department;
  els.sort.value = state.sort;
}

async function load() {
  showLoading(els.list);
  try {
    state.employees = await getEmployees();
    render();
  } catch (error) {
    console.error(error);
    showError(els.list, error.message);
  }
}

initFilters();
load();
