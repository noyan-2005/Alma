const totalUsersCount = document.getElementById("totalUsersCount");
const totalFoodsCount = document.getElementById("totalFoodsCount");

async function fetchCount(apiURL, targetElement, errorLabel) {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${errorLabel}`);
        }

        const data = await response.json();
        switch (errorLabel) {
            case "foods":
                targetElement.innerText = data.total;
                break;
            case "users":
                targetElement.innerText = data.length;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
        targetElement.innerHTML = `<span class="p-5 text-red-500">Could not load data.</span>`;
    }
}
fetchCount(BACKEND_USERS_API, totalUsersCount, "users");
fetchCount(BACKEND_FOODS_API, totalFoodsCount, "foods");
