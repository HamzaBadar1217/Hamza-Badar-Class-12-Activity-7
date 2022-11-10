const timer = document.querySelector(".timeLeft");
const firstRow = document.querySelector(".first-row");
const tableRow = document.querySelector(".table-row");

const tableBody = document.querySelector("#tableBody");
const pagination = document.querySelector("#pagination");
const dropDown = document.querySelector("#dropDown");

const displayLength = document.querySelector("#displayLengthPerPage");
const totalLength = document.querySelector("#totalLength");

const promise = new Promise((resolve, reject) => {
  debugger;
  const fetchApi = fetch("https://jsonplaceholder.typicode.com/users");
  const response = fetchApi.then((res) => {
    if (res.status === 200) {
      resolve(res.json());
    } else {
      reject("Your API is not carrying data");
    }
  });
  return response;
});

setTimeout(() => {
  promise
    .then((data) => {
      //   console.log(data);
      // console.log(typeof dropDown)

      let item = [];
      let paginationNumber = [];
      let paginationDropDown = [];

      data.forEach((element, index) => {
        item += `<tr class="tableRow">  
            <td>${index + 1}</td>  
            <td>${element.name}</td>  
            <td>${element.email}</td>  
            <td>${element.address.street}, ${element.address.city}, ${
          element.address.zipcode
        }</td>  
        </tr> `;

        if (
          index == parseInt(data.length) - 1 ||
          index == parseInt(data.length / 2) - 1 ||
          index == parseInt(data.length / 2 / 2) - 1
        ) {
          paginationDropDown += `
        <option value=${index + 1} class= option-${index + 1}>${
            index + 1
          }</option>
        `;
        }

        paginationNumber += `
        <li class="page-item" onclick="tableRowFunc(pagination.children[${
          index + 1
        }].children[0].innerHTML)"><a class="page-link">${index + 1}</a></li>
        `;
      });

      tableBody.innerHTML = item;
      dropDown.innerHTML = `
                        <option class='me-3' style='font-size='0.776em; color: #4ca392;' disabled>Open this select menu</option>
                        ${paginationDropDown}`;
      pagination.innerHTML = `<li class="page-item" onclick="prev()">
                                <a class="page-link" href="#" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                              </li>
                              ${paginationNumber}
                              <li class="page-item" onclick="next()">
                                <a class="page-link" href="#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                              </li>`;

      dropDown.lastElementChild.setAttribute("selected", true);

      totalLength.innerText = tableBody.childElementCount;
    })
    .catch((error) => {
      alert(error);
    });
}, 10000);

const myFunc = (value) => {
  displayLength.innerText = value;
  const tableRow = document.querySelectorAll(".tableRow");
  pagination.classList.remove("d-none");

  for (let i = 0; i < tableRow.length; i++) {
    pagination.children[i].classList.remove("active");
  }

  pagination.children[1].classList.add("active");

  for (let i = 0; i < tableRow.length; i++) {
    tableRow[i].classList.remove("d-none");
  }

  if (value == tableBody.childElementCount) {
    if (pagination.classList.contains("d-none")) {
      return;
    } else {
      pagination.classList.add("d-none");
    }
    console.log(pagination.classList);
  } else if (
    value >= tableBody.childElementCount / 2 &&
    value < tableBody.childElementCount
  ) {
    for (
      let i =
        tableBody.childElementCount / (tableBody.childElementCount / 2) + 1;
      i <= tableBody.childElementCount;
      i++
    ) {
      pagination.children[i].classList.add("d-none");
    }

    for (i = value; i < tableBody.childElementCount; i++) {
      tableRow[i].classList.add("d-none");
    }
  } else {
    for (let i = 1; i <= parseInt(tableBody.childElementCount / value); i++) {
      pagination.children[i].classList.remove("d-none");
    }
  }
  for (
    let i = parseInt(tableBody.childElementCount / value) + 1;
    i <= parseInt(tableBody.childElementCount);
    i++
  ) {
    pagination.children[i].classList.add("d-none");
  }

  for (i = value; i < tableBody.childElementCount; i++) {
    tableRow[i].classList.add("d-none");
  }
};

const tableRowFunc = (pageValue) => {
  const tableRow = document.querySelectorAll(".tableRow");
  for (let i = 0; i < tableRow.length; i++) {
    tableRow[i].classList.add("d-none");
  }

  for (let i = 0; i <= tableRow.length; i++) {
    pagination.children[i].classList.remove("active");
  }

  pagination.children[parseInt(pageValue)].classList.add("active");

  tableRow.children;
  let arr = [0];
  let i = 1;
  let value = parseInt(dropDown.value);

  while (i <= tableRow.length / value) {
    arr.push(value * i);
    i++;
  }

  for (
    let i = arr[parseInt(pageValue) - 1];
    i < arr[parseInt(pageValue)];
    i++
  ) {
    tableRow[i].classList.remove("d-none");
  }
};

const prev = () => {
  const tableRow = document.querySelectorAll(".tableRow");

  let pageValue;
  for (let i = 0; i <= tableRow.length; i++) {
    if (pagination.children[i].classList.contains("active")) {
      pageValue = parseInt(pagination.children[i].children[0].innerHTML);
    }
  }

  if (pageValue === 1) {
    return;
  } else {
    tableRowFunc(pageValue - 1);
  }
};

const next = () => {
  const tableRow = document.querySelectorAll(".tableRow");

  let pageValue;
  for (let i = 0; i <= tableRow.length; i++) {
    if (pagination.children[i].classList.contains("active")) {
      pageValue = parseInt(pagination.children[i].children[0].innerHTML);
    }
  }

  let lastElement =
    parseInt(
      pagination.children[pagination.children.length - 2].children[0].innerHTML
    ) / parseInt(dropDown.value);

  if (lastElement === pageValue) {
    return;
  } else {
    tableRowFunc(pageValue + 1);
  }
};

let timerValue = 10;
let opacityValue = 1;

let timeInterval = setInterval(() => {
  debugger;
  timerValue -= 1;
  timer.innerText = timerValue;

  if (timerValue <= 0) {
    clearInterval(timeInterval);
    let opacityInterval = setInterval(() => {
      opacityValue -= 0.1;
      firstRow.style.opacity = opacityValue;

      if (opacityValue <= 0) {
        clearInterval(opacityInterval);
        firstRow.style.display = "none";
        tableRow.classList.remove("d-none");
      }
    }, 250);
  }
}, 1000);
