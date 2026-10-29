(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://randomuser.me/api/`;async function t(t=30){let n=new URLSearchParams({results:t,seed:`sumerix`,nat:`us,gb,au`,inc:`login,name,email,phone,cell,picture,location,dob,gender`}),r=await fetch(`${e}?${n}`);if(!r.ok)throw Error(`Request failed (HTTP ${r.status})`);return(await r.json()).results}var n=[`Engineering`,`Accounting`,`Sales`,`Marketing`,`Finance`,`Design`],r={Engineering:[`Software Engineer`,`QA Engineer`],Accounting:[`Accountant`,`Auditor`],Sales:[`Sales Consultant`,`Account Manager`],Marketing:[`Communication Manager`,`Marketing Coordinator`],Finance:[`Financial Supervisor`,`Budget Analyst`],Design:[`Product Designer`,`UX Researcher`]},i={favorites:`ed:favorites`,theme:`ed:theme`,department:`ed:department`,sort:`ed:sort`,selected:`ed:selected`,cache:`ed:employees-cache`};function a(e){return{get(t,n=null){try{let r=e.getItem(t);return r===null?n:JSON.parse(r)}catch{return n}},set(t,n){try{e.setItem(t,JSON.stringify(n))}catch(e){console.warn(`Storage unavailable:`,e)}},remove(t){e.removeItem(t)}}}var o=a(localStorage),s=a(sessionStorage);function c(e,t){let i=n[t%n.length],a=r[i];return{id:e.login.uuid,name:`${e.name.first} ${e.name.last}`,title:a[Math.floor(t/n.length)%a.length],department:i,availability:t%5==1?`Out`:`Available`,phone:e.phone,mobile:e.cell,email:e.email,photo:e.picture.medium,office:e.location.city,gender:e.gender===`male`?`Male`:`Female`,birthday:new Date(e.dob.date).toLocaleDateString(`en-GB`,{day:`numeric`,month:`long`})}}async function l(){let e=s.get(i.cache);if(e)return e;let n=(await t(30)).map(c);return n.forEach(e=>{let t=n.find(t=>t.department===e.department&&t.id!==e.id);e.supervisor=t?t.name:`—`}),s.set(i.cache,n),n}function u(e,t=300){let n;return(...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)}}function d(e=``){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}function f(e,t,{favorites:n,selectedId:r}){e.innerHTML=`
    <ul class="divide-y divide-slate-200 dark:divide-slate-700">
      ${t.map(e=>{let t=n.has(e.id),i=e.id===r,a=e.availability===`Available`?`text-teal-600`:`text-red-600`;return`
        <li class="flex items-center ${i?`bg-slate-50 dark:bg-slate-700/50`:``}">
          <button type="button" data-select="${e.id}" aria-current="${i}"
            class="grid flex-1 grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal-500 sm:grid-cols-[2fr_1fr_1fr_1fr] dark:hover:bg-slate-700/50">
            <span class="flex items-center gap-3">
              <img src="${e.photo}" alt="" width="40" height="40" loading="lazy" class="h-10 w-10 rounded-full object-cover" />
              <span>
                <span class="block text-sm font-medium">${d(e.name)}</span>
                <span class="block text-xs text-slate-500">${d(e.title)}</span>
              </span>
            </span>
            <span class="hidden text-sm sm:block">${d(e.department)}</span>
            <span class="hidden text-sm sm:block">${d(e.phone)}</span>
            <span class="text-sm font-medium ${a}">● ${e.availability}</span>
          </button>
          <button type="button" data-fav="${e.id}" aria-pressed="${t}"
            aria-label="${t?`Remove`:`Add`} ${d(e.name)} ${t?`from`:`to`} favorites"
            class="px-4 py-3 text-xl focus-visible:outline-2 focus-visible:outline-teal-500 ${t?`text-amber-400`:`text-slate-300`}">
            ${t?`★`:`☆`}
          </button>
        </li>`}).join(``)}
    </ul>`}var p=(e,t)=>`
  <div class="flex justify-between gap-4 py-1 text-sm">
    <dt class="text-slate-500">${e}</dt>
    <dd class="text-right">${d(t)}</dd>
  </div>`;function m(e,t,n){if(!t){e.innerHTML=`<p class="text-sm text-slate-500">Select an employee to see their details.</p>`;return}let r=n.has(t.id);e.innerHTML=`
    <div class="flex items-center gap-4">
      <img src="${t.photo}" alt="${d(t.name)}" class="h-16 w-16 rounded-full object-cover" />
      <div>
        <h2 class="text-lg font-semibold">${d(t.name)}</h2>
        <p class="text-sm text-slate-500">${d(t.title)}</p>
        <p class="text-sm ${t.availability===`Available`?`text-teal-600`:`text-red-600`}">● ${t.availability}</p>
      </div>
    </div>

    <h3 class="mt-6 border-t border-slate-200 pt-4 text-center text-sm font-semibold dark:border-slate-700">Contact Information</h3>
    <dl class="mt-2">
      ${p(`Office Tel`,t.phone)}
      ${p(`Mobile`,t.mobile)}
      ${p(`Email`,t.email)}
    </dl>

    <h3 class="mt-4 border-t border-slate-200 pt-4 text-center text-sm font-semibold dark:border-slate-700">Work Information</h3>
    <dl class="mt-2">
      ${p(`Department`,t.department)}
      ${p(`Supervisor`,t.supervisor)}
      ${p(`Office`,t.office)}
    </dl>

    <h3 class="mt-4 border-t border-slate-200 pt-4 text-center text-sm font-semibold dark:border-slate-700">Personal Information</h3>
    <dl class="mt-2">
      ${p(`Sex`,t.gender)}
      ${p(`Birthday`,t.birthday)}
      ${p(`City`,t.office)}
    </dl>

    <button type="button" data-fav="${t.id}" aria-pressed="${r}"
      class="mt-6 w-full rounded border border-teal-600 py-2 text-sm text-teal-600 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:hover:bg-slate-700">
      ${r?`★ Remove from favorites`:`☆ Add to favorites`}
    </button>`}function h(e){e.innerHTML=`
    <div class="flex flex-col items-center gap-3 py-16" role="status">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      <p class="text-sm text-slate-500">Loading employees…</p>
    </div>`}function g(e,t){e.innerHTML=`
    <div class="py-16 text-center" role="alert">
      <p class="font-semibold text-red-600">Something went wrong</p>
      <p class="mt-1 text-sm text-slate-500">${d(t)}</p>
      <button id="retry-btn" type="button"
        class="mt-4 rounded bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
        Retry
      </button>
    </div>`}function _(e){e.innerHTML=`
    <div class="py-16 text-center">
      <p class="font-medium">No employees found</p>
      <p class="mt-1 text-sm text-slate-500">Try changing your search or filters.</p>
    </div>`}var v=e=>document.querySelector(e),y={list:v(`#employee-list`),detail:v(`#detail-panel`),count:v(`#result-count`),search:v(`#search`),department:v(`#department`),availability:v(`#availability`),sort:v(`#sort`),favOnly:v(`#favorites-only`),theme:v(`#theme-toggle`)},b={employees:[],query:``,department:o.get(i.department,`All`),availability:`All`,sort:o.get(i.sort,`az`),favoritesOnly:!1,favorites:new Set(o.get(i.favorites,[])),selectedId:s.get(i.selected)};function x(e){document.documentElement.classList.toggle(`dark`,e===`dark`),y.theme.setAttribute(`aria-pressed`,String(e===`dark`)),y.theme.textContent=e===`dark`?`Light mode`:`Dark mode`}x(o.get(i.theme)??(window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`)),y.theme.addEventListener(`click`,()=>{let e=document.documentElement.classList.contains(`dark`)?`light`:`dark`;x(e),o.set(i.theme,e)});function S(){let e=b.query.trim().toLowerCase();return b.employees.filter(t=>t.name.toLowerCase().includes(e)&&(b.department===`All`||t.department===b.department)&&(b.availability===`All`||t.availability===b.availability)&&(!b.favoritesOnly||b.favorites.has(t.id))).sort({az:(e,t)=>e.name.localeCompare(t.name),za:(e,t)=>t.name.localeCompare(e.name),dept:(e,t)=>e.department.localeCompare(t.department)||e.name.localeCompare(t.name)}[b.sort])}function C(){let e=S();y.count.textContent=`${e.length} employee${e.length===1?``:`s`} found`,e.length===0?_(y.list):f(y.list,e,b);let t=b.employees.find(e=>e.id===b.selectedId);m(y.detail,t,b.favorites)}function w(e){b.favorites.has(e)?b.favorites.delete(e):b.favorites.add(e),o.set(i.favorites,[...b.favorites]),C()}function T(e){b.selectedId=e,s.set(i.selected,e),C()}y.search.addEventListener(`input`,u(e=>{b.query=e.target.value,C()})),y.department.addEventListener(`change`,e=>{b.department=e.target.value,o.set(i.department,b.department),C()}),y.availability.addEventListener(`change`,e=>{b.availability=e.target.value,C()}),y.sort.addEventListener(`change`,e=>{b.sort=e.target.value,o.set(i.sort,b.sort),C()}),y.favOnly.addEventListener(`change`,e=>{b.favoritesOnly=e.target.checked,C()}),y.list.addEventListener(`click`,e=>{let t=e.target.closest(`[data-fav]`),n=e.target.closest(`[data-select]`);if(t)return w(t.dataset.fav);if(n)return T(n.dataset.select);e.target.closest(`#retry-btn`)&&D()}),y.detail.addEventListener(`click`,e=>{let t=e.target.closest(`[data-fav]`);t&&w(t.dataset.fav)});function E(){y.department.innerHTML=[`All`,...n].map(e=>`<option value="${e}">${e}</option>`).join(``),y.department.value=b.department,y.sort.value=b.sort}async function D(){h(y.list);try{b.employees=await l(),C()}catch(e){console.error(e),g(y.list,e.message)}}E(),D();