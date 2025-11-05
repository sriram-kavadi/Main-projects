// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        const price=document.querySelector("#price");
        if(price<0){
            alert("Invalid price");
        }
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
  
})()


// This is an example script, please modify as needed
  const rangeInput = document.getElementById('range4');
  const rangeOutput = document.getElementById('rangeValue');

  rangeInput.addEventListener('input', function() {
    let values=``;
    for(let i=1;i<=this.value;i++){
      values+=`<i class="fa-solid fa-star starColor"></i>`
    }
    rangeOutput.innerHTML= values;
  });
const reviewCall=()=>{
  const formRange=document.querySelector(".form-range").value;
  console.log(formRange)
  let values=``;
    for(let i=1;i<=formRange;i++){
      values+=`<i class="fa-solid fa-star starColor"></i>`
    }
    rangeOutput.innerHTML= values;
  };
reviewCall()

const start=()=>{
  const reviewStar=document.querySelectorAll(".reviewStar")
  reviewStar.forEach((data)=>{
    const rating = parseInt(data.dataset.rating);
    const date = data.dataset.date;
    let values=``;
    for(let i=1;i<=rating;i++){
      values+=`<i class="fa-solid fa-star starColor"></i>`
    }
    data.innerHTML = `${values}  <small>${new Date(date).toLocaleDateString()}</small>`;
  })
}
start();