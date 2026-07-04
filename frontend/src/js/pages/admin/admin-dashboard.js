// ================== //
// Open/Close Sidebar //
// ================== //
const sidebar = document.getElementById("sidebar");
const openSidebarButton = document.getElementById("openSidebarButton");
const closeSidebarButton = document.getElementById("closeSidebarButton");

function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
}

function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
}

openSidebarButton.addEventListener("click", openSidebar);
closeSidebarButton.addEventListener("click", closeSidebar);

// ========================================== //
// Sidebar Buttons And Their Related Sections //
// ========================================== //
const sidebarDashboardButton = document.getElementById(
    "sidebarDashboardButton",
);
const sidebarUsersButton = document.getElementById("sidebarUsersButton");
const sidebarFoodsButton = document.getElementById("sidebarFoodsButton");
const sidebarLogsButton = document.getElementById("sidebarLogsButton");
const sidebarSettingsButton = document.getElementById("sidebarSettingsButton");

const dashboardSection = document.getElementById("dashboard-section");
const usersSection = document.getElementById("users-section");
const foodsSection = document.getElementById("foods-section");
const logsSection = document.getElementById("logs-section");
const settingsSection = document.getElementById("settings-section");

// Click the button => Open its corresponding section and close the sidebar.
sidebarDashboardButton.addEventListener("click", () => {
    dashboardSection.classList.remove("hidden");
    usersSection.classList.add("hidden");
    foodsSection.classList.add("hidden");
    logsSection.classList.add("hidden");
    settingsSection.classList.add("hidden");
    closeSidebar();
});

sidebarUsersButton.addEventListener("click", async () => {
    dashboardSection.classList.add("hidden");
    usersSection.classList.remove("hidden");
    foodsSection.classList.add("hidden");
    logsSection.classList.add("hidden");
    settingsSection.classList.add("hidden");
    closeSidebar();
    await loadUsers();
});

sidebarFoodsButton.addEventListener("click", async () => {
    dashboardSection.classList.add("hidden");
    usersSection.classList.add("hidden");
    foodsSection.classList.remove("hidden");
    logsSection.classList.add("hidden");
    settingsSection.classList.add("hidden");
    closeSidebar();
    await loadFoods();
});

sidebarLogsButton.addEventListener("click", () => {
    dashboardSection.classList.add("hidden");
    usersSection.classList.add("hidden");
    foodsSection.classList.add("hidden");
    logsSection.classList.remove("hidden");
    settingsSection.classList.add("hidden");
    closeSidebar();
});

sidebarSettingsButton.addEventListener("click", () => {
    dashboardSection.classList.add("hidden");
    usersSection.classList.add("hidden");
    foodsSection.classList.add("hidden");
    logsSection.classList.add("hidden");
    settingsSection.classList.remove("hidden");
    closeSidebar();
});

// ================ //
// Fetch Users Data //
// ================ //
const BACKEND_USERS_API = "http://localhost:5000/users";

const usersTableBody = document.getElementById("usersTableBody");

// Fetch users from backend
async function loadUsers() {
    try {
        const response = await fetch(BACKEND_USERS_API);
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.log(error);
        usersTableBody.innerHTML = `
            <tr>
                <td class="p-4 text-red-500" colspan="4">Could not load users.</td>
            </tr>
        `;
    }
}

// Show users in the table
function renderUsers(users) {
    usersTableBody.innerHTML = users
        .map(
            (user) => `
            <tr class="border-b">
                <td class="p-4">${user.user_id ?? "-"}</td>
                <td class="p-4">${user.first_name + " " + user.last_name ?? "-"}</td>
                <td class="p-4">${user.mobile ?? "-"}</td>
                <td class="p-4">${user.username ?? "-"}</td>
                <td class="p-4">${user.email ?? "-"}</td>
                <td class="p-4">${user.role ?? "-"}</td>
            </tr>`,
        )
        .join("");
}

// ================ //
// Fetch Foods Data //
// ================ //
const BACKEND_FOODS_API = "http://localhost:5000/foods";

const foodsTableBody = document.getElementById("foodsTableBody");

// Fetch foods from backend
let currentFoodPage = 1;
let totalFoodPages = 1;

async function loadFoods(page = 1) {
    try {
        const res = await fetch(`${BACKEND_FOODS_API}?page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch foods");

        const data = await res.json();
        currentFoodPage = data.page;
        totalFoodPages = data.totalPages;
        renderFoods(data.foods || []);
        renderFoodsPagination();
    } catch (error) {
        console.error(error);
        foodsTableBody.innerHTML = `
            <tr>
                <td class="p-4 text-red-500" colspan="4">Could not load foods.</td>
            </tr>
        `;
    }
}

// Show foods in the table
function renderFoods(foods) {
    foodsTableBody.innerHTML = foods
        .map(
            (food) => `
            <tr class="border-b">
                <td class="p-4">${food.food_id ?? "-"}</td>
                <td class="p-4">${food.food_name ?? "-"}</td>
                <td class="p-4">${food.category ?? "-"}</td>
                <td class="p-4">${food.calories_per_100 ?? "-"} cal</td>
                <td class="p-4">${food.protein_g_per_100 ?? "-"} g</td>
                <td class="p-4">${food.carbs_g_per_100 ?? "-"} g</td>
                <td class="p-4">${food.fat_g_per_100 ?? "-"} g</td>
                <td class="p-4">${food.sodium_mg_per_100 ?? "-"} mg</td>
                <td class="p-4">${food.sugar_g_per_100 ?? "-"} g</td>
                <td class="p-4">${food.fiber_g_per_100 ?? "-"} g</td>
                <td class="p-4">${food.cholesterol_mg_per_100 ?? "-"} mg</td>
                <td class="p-4">${food.calcium_mg_per_100 ?? "-"} mg</td>
                <td class="p-4">${food.iron_mg_per_100 ?? "-"} mg</td>
                <td class="p-4">${food.potassium_mg_per_100 ?? "-"} mg</td>
                <td class="p-4">${food.phosphorus_mg_per_100 ?? "-"} mg</td>
            </tr>
        `,
        )
        .join("");
}

// Dynamic pagination buttons
async function changeFoodPage(page) {
    if (page < 1 || page > totalFoodPages) return;
    await loadFoods(page);
}

const foodsPagination = document.getElementById("foodsPagination");

function renderFoodsPagination() {
    let html = "";

    html += `
        <button
            class="px-3 py-2 mt-2 rounded-xl text-white ${currentFoodPage === 1 ? "bg-slate-400 cursor-not-allowed" : "bg-purple-600"}"
            ${currentFoodPage === 1 ? "disabled" : ""}
            onclick="changeFoodPage(${currentFoodPage - 1})"
        >
            Prev
        </button>
    `;

    for (let i = 1; i <= totalFoodPages; i++) {
        html += `
            <button
                class="hover:bg-purple-900 px-3 py-2 mx-1 rounded-xl text-white ${i === currentFoodPage ? "bg-purple-800" : "bg-purple-600"}"
                onclick="changeFoodPage(${i})"
            >
                ${i}
            </button>
        `;
    }

    html += `
        <button
            class="px-3 py-2 mx-1 rounded-xl text-white ${currentFoodPage === totalFoodPages ? "bg-slate-400 cursor-not-allowed" : "bg-purple-600"}"
            ${currentFoodPage === totalFoodPages ? "disabled" : ""}
            onclick="changeFoodPage(${currentFoodPage + 1})"
        >
            Next
        </button>
    `;

    foodsPagination.innerHTML = html;
}
