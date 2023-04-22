"use strict"

let form = document.querySelector('.form');
let fieldInput = form.querySelectorAll('.fieldInput');
let tooltip = form.querySelector('.tooltip');
let postalCode = form.querySelector('#postalCode');
let country = form.querySelector('#country');
let countrySecondSelect = form.querySelector('#countrySecondSelect');
let allInputs = form.querySelectorAll('.allinput');
//tooltip.style.display = "none";
let countryList;

fieldInput.forEach( e => e.addEventListener('input', function() {
    if( !(/^[a-z]+$/i).test(this.value) ){
        e.classList.add("inval");
        //tooltip.style.display = "";
    }else{
        e.classList.remove("inval");
        //tooltip.style.display = "none";
    }
}
));

let requestUrl = 'https://gist.githubusercontent.com/jamesbar2/1c677c22df8f21e869cca7e439fc3f5b/raw/21662445653ac861f8ab81caa8cfaee3185aed15/postal-codes.json';
let xhr = new XMLHttpRequest();

xhr.open('GET', requestUrl, true);
xhr.send()

xhr.onerror = function() {
  alert(`Ошибка соединения`);
};

xhr.onload = function() {
   countryList = JSON.parse(xhr.response);
  countryFunction(countryList);
};

function countryFunction(array) {
    for (let i = 0; i < array.length; i++){
      let countryName = document.createElement('option');
      countryName.innerHTML = array[i].Country;
      country.append(countryName);
    }

    for (let i = 0; i < array.length; i++){
      let countryName = document.createElement('option');
      countryName.innerHTML = array[i].Country;
      countrySecondSelect.append(countryName);
    }
  };

  country.addEventListener('change', function() {
    const chosenCountry = this.value;
    console.log(chosenCountry);
    findPostalCode(chosenCountry);
  });


  function findPostalCode(str){
    for( let i = 0; i < countryList.length; i++ ){
      if( countryList[i].Country == str ){
        let regexpForIndex = new RegExp(`${countryList[i].Regex}`);

        postalCode.addEventListener('input', function(){
          if( !regexpForIndex.test(this.value)){
            postalCode.classList.add("inval");
          }else{
            postalCode.classList.remove("inval");
          }});
        };
    
      }
    }

form.querySelector('.real-checkbox').addEventListener('change', fillShippingData);

function fillShippingData(){
  fillShippingData.count++;
  let arrayFromFieldInput = Array.from(allInputs);

  if ( fillShippingData.count % 2 == 0 ){
     for ( let i = 6; i < arrayFromFieldInput.length; i++ ){

      arrayFromFieldInput[i].disabled = false;
      arrayFromFieldInput[i].value = "";
     }
     return arrayFromFieldInput;
  }

  for ( let i = 6, k = 2; i < arrayFromFieldInput.length; i++, k++){

    arrayFromFieldInput[i].disabled = true;
    arrayFromFieldInput[i].value = arrayFromFieldInput[k].value;
  }


  
  return arrayFromFieldInput;
}

fillShippingData.count = 0;




  
    






