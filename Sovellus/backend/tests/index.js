
let selectedUserId = null;

async function fetchUsers() {
  const response = await fetch("/users");
  const users = await response.json();
  const userList = document.getElementById("userList");
  userList.innerHTML = "";
  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-item");

    userDiv.innerHTML = `<span>${user.name} - ${user.email}</span>
      <div class="actions">
          <button onclick="selectUser(${user.id})">Edit</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
      </div>`;
    userList.appendChild(userDiv);
  });
}

async function selectUser(id) {

  const response = await fetch("/users");
  const users = await response.json();
  const user = users.find(u => u.id === id);
  if (user) {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    selectedUserId = user.id;
  }
}

async function addUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Fill all fields!");
    return;
  }

  await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });


  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  fetchUsers();
}

async function editUser() {
  if (!selectedUserId) {
    alert("Select a user to edit first!");
    return;
  }

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Fill all fields!");
    return;
  }

  await fetch(`/users/${selectedUserId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  selectedUserId = null;
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  fetchUsers();
}

async function deleteUser(id) {
  await fetch(`/users/${id}`, { method: "DELETE" });
  fetchUsers();
}

fetchUsers();
