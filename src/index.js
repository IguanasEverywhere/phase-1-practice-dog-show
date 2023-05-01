document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#table-body');
  const dogForm = document.querySelector('#dog-form');
  let selectedDogId = '';

  // FETCH ALL DOGS FROM API
  function fetchAllDogs() {
    fetch('http://localhost:3000/dogs')
      .then(res => res.json())
      .then(dogsData => appendDogs(dogsData));
  }
  fetchAllDogs();


  // APPEND ALL DOGS TO TABLE
  function appendDogs(dogsData) {
    dogsData.forEach(dog => {
      let dogRow = document.createElement('tr');
      let dogName = document.createElement('td');
      dogName.textContent = dog.name;
      let dogBreed = document.createElement('td');
      dogBreed.textContent = dog.breed;
      let dogSex = document.createElement('td');
      dogSex.textContent = dog.sex;
      let editColumn = document.createElement('td');
      let editDogBtn = document.createElement('button');
      editDogBtn.textContent = 'Edit Dog';
      editColumn.append(editDogBtn);
      editDogBtn.addEventListener('click', () => {
        populateEditForm(dog);
      });

      tableBody.append(dogRow);
      dogRow.append(dogName);
      dogRow.append(dogBreed);
      dogRow.append(dogSex);
      dogRow.append(editColumn);
    });
  }

  // POPULATE FORM WITH SELECTED DOG DATA
  function populateEditForm(dogData) {
    let nameInput = dogForm.querySelector('[name="name"]');
    nameInput['value'] = dogData.name;
    let breedInput = dogForm.querySelector('[name="breed"]');
    breedInput['value'] = dogData.breed;
    let sexInput = dogForm.querySelector('[name="sex"]');
    sexInput['value'] = dogData.sex;
    selectedDogId = dogData.id;
  }

  // HANDLE FORM SUBMISSION
  dogForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let nameInput = dogForm.querySelector('[name="name"]');
    let breedInput = dogForm.querySelector('[name="breed"]');
    let sexInput = dogForm.querySelector('[name="sex"]');


    fetch(`http://localhost:3000/dogs/${selectedDogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        breed: breedInput.value,
        sex: sexInput.value
      })
    })
      .then(res => {
        tableBody.innerHTML = '';
        nameInput.value = '';
        breedInput.value = '';
        sexInput.value = '';
        fetchAllDogs();
      });
  })
});

