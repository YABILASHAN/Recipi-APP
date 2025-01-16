
const searchBox = document.querySelector("#search");
const searchButton = document.querySelector("#searchBtn");
const recipeContainer = document.querySelector("#recipeList");
const recipeDetails = document.querySelector("#recipeDetails");
const recipeName = document.querySelector("#recipeName");
const recipeImage = document.querySelector("#recipeImage");
const recipeInstructions = document.querySelector("#recipeInstructions");


const API_URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "YOUR_API_KEY"; 


searchButton.addEventListener("click", async () => {
    const query = searchBox.value.trim();

    if (!query) {
        alert("Please enter a recipe to search!");
        return;
    }

    try {
       
        const response = await fetch(`${API_URL}?query=${query}&number=6&apiKey=${API_KEY}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayRecipes(data.results);
        } else {
            recipeContainer.innerHTML = `<h3>No recipes found for "${query}". Try another search!</h3>`;
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeContainer.innerHTML = `<h3>Unable to fetch recipes. Please try again later!</h3>`;
    }
});


function displayRecipes(recipes) {
    recipeContainer.innerHTML = ""; 

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-item");

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <button class="view-more" onclick="fetchRecipeDetails(${recipe.id})">View More</button>
        `;

        recipeContainer.appendChild(recipeCard);
    });
}


async function fetchRecipeDetails(recipeId) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
        const recipe = await response.json();

        recipeName.textContent = recipe.title;
        recipeImage.src = recipe.image;
        
    
        recipeInstructions.innerHTML = recipe.instructions || "No instructions available for this recipe.";

        recipeDetails.style.display = "block";
        recipeContainer.style.display = "none";
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        alert("Unable to fetch recipe details. Please try again later!");
    }
}
