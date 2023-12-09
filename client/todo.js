const API = "http://localhost:3000"

// function to get from API
async function getAll() {
  try {
    const res = await fetch(`${API}/todos`);
    const data = await res.json();
    console.log(data);
    const dData = await displayData(data);
  } catch (err) {
    console.log("Error reading data", err);
    return [];
  }
}

// function to Display data
function displayData(data) {
  let parent = document.getElementById("data");

  // Clear previous content
  parent.innerHTML = " ";

  //Create element to append the Container
  data.forEach((element) => {
    let displayTodo = document.createElement("li");
    displayTodo.innerHTML = `<h3>${element.title}  :  ${element.description} </h3><br>`;
    parent.appendChild(displayTodo);

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.id = "edit-btn";

    editBtn.onclick = () => {
      // console.log("btn clicked")
      updateTodo(element);
    };

    displayTodo.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.id = "delete-btn";

    deleteBtn.onclick = () => {
      deleteTodo(element);
    };

    displayTodo.appendChild(deleteBtn);
  });
}

//Fetch data and display it

getAll();

//add todo
function addTodo() {
  let tit = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;

  let todoData = {
    title: tit,
    description: desc,
  };

  fetch(`${API}/todos`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todoData),
  }).then((res) =>
    res.json().then((data) => {
      console.log("Todo Addded Successfully", data);
      getAll();
    })
  );
}

// update todo
async function updateTodo(element) {
  let saveBtn = document.getElementById("btn");
  saveBtn.innerHTML = "Update";

  // Populate the input fields with the item data
  let tit = document.getElementById("title");
  tit.value = element.title;
  let desc = document.getElementById("desc");
  desc.value = element.description;

  // Add a click event listener to the button for updating

  saveBtn.onclick = async () => {
    let ti = tit.value;
    let des = desc.value;
    let disData = { title: ti, description: des };

    const res = await fetch(`${API}/todos/${element._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json " },
      body: JSON.stringify(disData),
    });

    const data = await res.json();
    console.log(data);

    getAll();
    // Reset the button text to "Save"
    saveBtn.innerHTML = "Save";
    // Clear the input fields
    tit.value = "";
    desc.value = "";
  };
}

//delete todo
async function deleteTodo(element) {
  const res = await fetch(`${API}/todos/${element._id}`, { method: "DELETE" });
  const data = res.json();
  console.log("Todo deleted ", data);
  getAll();
}
