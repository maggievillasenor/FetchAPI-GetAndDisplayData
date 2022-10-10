//comprobar correcto funcionamiento de .js con .html
console.log("APIFetch");
//enlazar boton con el evento Onclick 
const button = document.getElementById('btn');
button.addEventListener("click", solicitudFetch);
let data = document.getElementById("contenido");

function solicitudFetch() {
const users = JSON.parse(localStorage.getItem("users"));
data.innerHTML = ""; //para evitar que imprima el array de nuevo e incremente la lista.-limpiar el DOM
console.log(users);
console.log(typeof users);

    if (users && users.time > Date.now()) {
    fetchData(users.data);
    } 
    else {
        data.innerHTML = `
        <tr>
            <td class="text-center">
                <div class="spinner"></div>
            </td>
        </tr>
    `;

        
    fetch("https://reqres.in/api/users?delay=3")
        .then((response) => response.json())
        .then((users) => {
            const usersData = {
                data: users.data,
                time: Date.now() + 60000,
            };
            data.innerHTML = "";
    
            localStorage.setItem("users", JSON.stringify(usersData));
            fetchData(users.data)
           
        })//hasta aquí termina solicitud fetch
        .then (msje => console.log("Retorno del then anterior: "+ msje) )
        .catch ( err => {
            //procesando el error
            console.log(err) 
    });
    }
}
       

function fetchData(user) {
    for (let i = 0; i <user.length; i++) {
        data.innerHTML += `  
            <tr calss="users container-sm" >
                <td id="user-id" class="col-md-1"> ${user[i].id}</td>
                <td id="user-avatar" class="col-md-3"><img src="${user[i].avatar}" alt="${user[i].first_name}" class="rounded-circle " style="width: 65px"/></td>
                <td id="user-name" class="col-md-3"> ${user[i].first_name}</td>
                <td id="user-lastname" class="col-md-3"> ${user[i].last_name}</td>
                <td id="user-email" class="col-md-2"> ${user[i].email}</td>
            </tr>`;
    };
}



/* .map to get & display fetch api only... :( 
const usersData = users.data.map((user) => {
            return `
                    <tr calss="users" >
                        <td id="user-id" class="col-md-1"> ${user.id}</td>
                        <td id="user-avatar" class="col-md-3"><img src="${user.avatar}" alt="${user.first_name}" class="rounded-circle " style="width: 65px"/></td>
                        <td id="user-name" class="col-md-3"> ${user.first_name}</td>
                        <td id="user-lastname" class="col-md-3"> ${user.last_name}</td>
                        <td id="user-email" class="col-md-2"> ${user.email}</td>
                    </tr>
                    `;
                     join.();
            })
 */
        