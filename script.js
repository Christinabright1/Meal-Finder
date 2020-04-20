//Elements
//search element

const search= document.getElementById("search");
const submit= document.getElementById("submit");

const random= document.getElementById("random");
const mealElements= document.getElementById("meals");

const resultHeading= document.getElementById("result-heading");

const single_meal= document.getElementById("single-meal");

//Event Listener

submit.addEventListener('submit', searchMeal);

//Search meal and fetch from Api

function searchMeal(e){

//clear single meal
 single_meal.innerHTML="";
 //Search tem
 const term= search.value;

 //Check form empty
 if(term.trim()){
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
   .then(res => res.json())
   .then(data => {
    
     //add title
     resultHeading.innerHTML= `<h2>Search result for '${term}':</h2>`;
     //check if any meal with search term
     if(data.meals === null){
       resultHeading.innerHTML= `<p>There are no search results. Try again:</p>`;
     }else{
       mealElements.innerHTML= data.meals.map(meal => 
         `<div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
          <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
         </div>`
       ).join("");
     }
   })
      //clear search text
      search.value="";
 }
e.preventDefault();
}


//add event Listener for the container of each meals
mealElements.addEventListener('click', e =>{
  const mealInfo= e.path.find(item => {
    if(item.classList){
      return item.classList.contains('meal-info');
    }else{
      return false;
    }
  })
  //console.log(mealInfo);
    if(mealInfo){
      const mealID= mealInfo.getAttribute("data-mealid");
       getMealID(mealID);
       console.log(mealID);
    }
});
//Fetch meal by Id
  function getMealID(mealID){
     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
     .then(res => res.json())
     .then(data => {
       const myMeal= data.meals[0];
       // add meal to DOM
       //console.log(myMeal);
       addMealDOM(myMeal);
     });
  }
  
//write add meal to the Dom function
  function addMealDOM(myMeal){
    const ingredients= [];

    for(let i= 0; i<= 20; i++){
      if(myMeal[`strIngredient ${i}`]){

           ingredients.push(
        `${myMeal[`strIngredient ${i}`]} - ${myMeal[`strMeasure${i}`]}`
          );
          console.log(ingredients);
      }else{
         break;
      }
    }
     single_meal.innerHTML= `
       <div class="single-meal">
         <h1>${myMeal.strMeal}</h1>
         <img src="${myMeal.strMealThumb}"/>

         <div class="single-meal-info">
         ${myMeal.strCategory ? `<p>${myMeal.strCategory}</p>` : " "  }
         ${myMeal.strArea ? `<p>${myMeal.strArea}</p>` : " "  }
         </div>
            <div class="main">
            <p>${myMeal.strInstructions}</p>
            <h2>Instructions</h2>
            <ul>
               ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            </div>

       </div>
     `;
  }

