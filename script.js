const input = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const meal = document.querySelector("#meal");
const mealItem = document.querySelector(".meal-item");
const mealDetails = document.querySelector(".meal-details");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const mealDetailsContent = document.querySelector(".meal-details-content");

const recipeTitle = document.querySelector(".recipe-title");
const recipeCategory = document.querySelector(".recipe-category");
const recipeInstructH3 = document.querySelector(".recipe-instruct h3");
const recipeInstructP = document.querySelector(".recipe-instruct p");
const recipeMealImg = document.querySelector(".recipe-meal-img img");
const recipeLink = document.querySelector(".recipe-link a");

let allMeals = [];

window.addEventListener("load", () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`)
    .then((res) => res.json())
    .then((data) => {
      allMeals = data.meals;
      showListMeal(allMeals);
    });
});

//  ------------------------------------------------show list meals
function showListMeal(enterArr) {
  meal.innerHTML = ""
  enterArr.forEach((item) => {
    const div = document.createElement("div");
    div.className = "meal-item";
    div.innerHTML = `
            <div class = "meal-img" data-id=${item.idMeal}>
              <img src = ${item.strMealThumb} alt = "food">
            </div>
            <div class = "meal-name">
              <h3>${item.strMeal}</h3>
              <a href = "#" class = "recipe-btn">Get Recipe</a>
            </div>
        `;
    meal.insertBefore(div, meal.children[0]);
  });
}

// --------------------------------------------------- show details od meal
meal.addEventListener("click", (e) => {
  // console.log(e.target.nodeName)
  if (e.target.nodeName == "A") {
    let id =
      e.target.parentElement.parentElement.children[0].getAttribute("data-id");
    console.log(id);
    console.log(typeof id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.meals[0]);
        let myMeal = data.meals[0];
        recipeTitle.textContent = myMeal.strMeal;
        recipeCategory.textContent = myMeal.strCategory;
        recipeInstructP.textContent = myMeal.strInstructions;
        recipeMealImg.setAttribute("src", `${myMeal.strMealThumb}`);
        recipeLink.setAttribute("href", `${myMeal.strYoutube}`);

        mealDetails.classList.add("showRecipe");
      });
  }
});

// -------------------------------------------------------- close details
recipeCloseBtn.addEventListener("click", () => {
  console.log("click on close");
  mealDetails.classList.remove("showRecipe");
  recipeTitle.textContent = "";
  recipeCategory.textContent = "";
  recipeInstructP.textContent = "";
});

// ------------------------------------------------ search
input.addEventListener("keyup", (e) => {
  if (e.target.value.trim()) {
    console.log(e.target.value);
    let searchedName = e.target.value.toLowerCase();
    let filteredNames = allMeals.filter((item) =>
      item.strMeal.toLowerCase().includes(searchedName)
    );
    console.log(filteredNames)
    showListMeal(filteredNames);
  }else{
    showListMeal(allMeals)
  }
});
