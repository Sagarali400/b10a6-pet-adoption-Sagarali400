// const loadCategories=()=>{
//     console.log('load catego')
//     // fetch("https://openapi.programming-hero.com/api/peddy/categories")
//     // .then((res)=>console.log(res))
// }
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json(res))
    .then((date) => displayButton(date.categories))
    .catch((error) => console.log(error));
};
const displayButton = (categories) => {
  const buttonContainerDisplay = document.getElementById("button-container");
  for (const buttonDetails of categories) {
    const petButton = document.createElement("button");
    petButton.classList = "btn lg:btn-lg btn-outline btn-info";
    petButton.innerHTML = `<img src=${buttonDetails.category_icon}> ${buttonDetails.category}`
        
        
    buttonContainerDisplay.append(petButton);
  }
};
loadCategories();
