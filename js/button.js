const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((date) => displayButton(date.categories))
    .catch((error) => console.log(error));
};
const displayButton = (categories) => {
  const buttonContainerDisplay = document.getElementById("button-container");
  for (const buttonDetails of categories) {
    const petButton = document.createElement("div");
    console.log(buttonDetails.category);

    petButton.innerHTML = `<button id="btn-${buttonDetails.category}" onclick="loadCategoriesCard('${buttonDetails.category}')" class="btn lg:btn-lg btn-outline btn-wide  btn-info"><img class='h-8 lg:h-12 btn-category' src=${buttonDetails.category_icon}> ${buttonDetails.category}</button>`;

    buttonContainerDisplay.append(petButton);
  }
};
const loadCategoriesCard = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${category}`);

      activeBtn.classList.add("active");

      displayCards(data.data);
    });
};
loadCategories();

//load cards
const loadCards = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayCards(data.pets))
    .catch((error) => console.log(error));
};
const displayCards = (petsDetails) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (petsDetails.length == 0) {
    cardContainer.innerHTML = `
    
      <div class="lg:col-span-3 md:col-span-2">
        <div class="card bg-[#13131308] p-[100px] ">
            <figure class="px-10 pt-10">
              <img
                src="images/error.webp"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title text-3xl font-bold">No Information Available</h2>
              <p class="text-[#131313B3] mt-4"> There is no information available. If you need further details, please visit another website. 
              At this moment, we can't provide information about this pet.</p>
            </div>
          </div>
    </div>
    `;
    return;
  }
  for (const petDetail of petsDetails) {
    const card = document.createElement("div");

    card.innerHTML = `
        <div class="card bg-base-100 lg:w-72 w-64 mx-auto mb-3 mt-4 mr-3 shadow-xl">
                    <figure class="mt-3">
                        <img src=${petDetail.image}
                             class="rounded-xl w-64" />
                    </figure>
                    <div class="card-body ">
                        <h2 class="card-title">${petDetail.pet_name}</h2>
                        <p class='flex'><img src="https://img.icons8.com/?size=24&id=tt0XRccN77xf&format=png">Breed:${petDetail.breed}</p>
                        <p class="flex"><img src="https://img.icons8.com/?size=24&id=84997&format=png">Birth:${petDetail.date_of_birth}</p>
                        <p class="flex"><img width="32" height="32" src="https://img.icons8.com/windows/32/mercury.png" alt="mercury"/>Gender: ${petDetail.gender}</p>
                        <p class="flex"><img width="24" height="24" src="https://img.icons8.com/material-two-tone/24/us-dollar--v1.png" alt="us-dollar--v1"/>Price : ${petDetail.price}$</p>
                        <div class="flex justify-between">
                            <button onclick="likeButtonDisplay('${petDetail.image}')" class="btn btn-outline btn-info"><img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/50/facebook-like--v1.png" alt="facebook-like--v1"/></button>
                            <button id="adopt-btn" onclick="adoptButton()" class="btn btn-outline btn-info">Adopt</button>
                            <button class="btn btn-outline btn-info" onclick="loadDetails('${petDetail.petId}')">Details</button>
                        </div>
                    </div>
                    <br>
                    
                </div>
        `;

    cardContainer.append(card);
  }
};
loadCards();
const likeButtonDisplay = (image) => {
  const imageContain = document.getElementById("img-show");

  const newElement = document.createElement("div");
  newElement.classList = "";

  newElement.innerHTML = `
  <div class=" pb-3">
  
    <img class="lg:w-[150px]" src=${image}>
  </div>
  `;
  imageContain.append(newElement);
};
const loadDetails = async (petId) => {
  console.log("see this", petId);
  const url = ` https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(url);
  const data = await res.json();

  displayDetails(data.petData);
};
const displayDetails = (detail) => {
  console.log(detail);
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
  <img class="mx-auto" src=${detail.image}>
  <h1 class="font-bold text-2xl">${detail.pet_name}
  </h1>
  <div class="grid grid-cols-2">
    <p class='flex text-base'><img src="https://img.icons8.com/?size=24&id=tt0XRccN77xf&format=png">Breed:${detail.breed}</p>
    <p class="flex text-base"><img src="https://img.icons8.com/?size=24&id=84997&format=png">Birth:${detail.date_of_birth}</p>
    <p class="flex text-base"><img width="32" height="32" src="https://img.icons8.com/windows/32/mercury.png" alt="mercury"/>Gender: ${detail.gender}</p>
    <p class="flex text-base"><img width="24" height="24" src="https://img.icons8.com/material-two-tone/24/us-dollar--v1.png" alt="us-dollar--v1"/>Price : ${detail.price}$</p>
    <p class="flex text-base"><img width="32" height="32" src="https://img.icons8.com/windows/32/mercury.png" alt="mercury"/>Vaccinated status:${detail.vaccinated_status}
  </div>
  <h3 class="text-2xl font-bold">Detail Information
  </h3>
  <p>${detail.pet_details}
  </p>
  `;

  document.getElementById("customModal").showModal();
};
const adoptButton = () => {
  const detailContainer2 = document.getElementById("modal-content2");
  detailContainer2.innerHTML = `
  <div class="text-center">
  <img width="50" height="50" class="mx-auto" src="https://img.icons8.com/fluency/50/ok.png" alt="ok"/>
    <h1>Congrates
  </h1>
  <p>Adoption process is start for your pet
  </p>

  <div id="countdown">
    
  </div>
  </div>
  `;
  document.getElementById("customModal2").showModal();
  startCountdown();
};

const startCountdown = () => {
  let timeLeft = 4; 
  const countdownElement = document.getElementById("countdown");
  const modal = document.getElementById("customModal2"); 
  const adoptBtn = document.querySelector("#adopt-btn"); 

  const interval = setInterval(() => {
    countdownElement.textContent = timeLeft; 
    timeLeft--; // Decrease the time

    if (timeLeft < 1) {
      clearInterval(interval); 
      countdownElement.textContent = "Time's up!"; 

      if (modal) {
        modal.close();
      }

      
    }
  }, 500); 
};




