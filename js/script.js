
const getJokeButton = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');

let jokes = JSON.parse(localStorage.getItem("jokes"))||[];//si no obtiene nada 




const getJoke = () => {
  fetch('https://api.chucknorris.io/jokes/random')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then((data) => {
        jokes.unshift(data.value);
        //!guardamos en localStorage
        localStorage.setItem("jokes",JSON.stringify(jokes))
        mostrarJokes()
    })
    .catch((error) => {
      jokeList.innerText = 'Error: No se pudo obtener la broma';
    });
}

getJokeButton.addEventListener ('click', getJoke );

function mostrarJokes () {
    jokeList.innerHTML = '';
    jokes.forEach ((i)=>{
        const li = document.createElement('li');
        li.textContent = i;
        jokeList.appendChild(li);
        const btnRemove = document.createElement('button');
        btnRemove.textContent = 'Eliminar broma'
        li.appendChild(btnRemove);
        btnRemove.addEventListener ('click',()=> {
            jokes= jokes.filter((j)=>j!==i)//eliminamos el chiste actual
            jokeList.removeChild(li)
            localStorage.setItem("jokes",JSON.stringify(jokes))//actualizamos localstorage
        } );
    });
}
const clearAll=()=>{
    jokeList.innerHTML = '';//borrar del dom
    jokes=[];//vaciar los chistes
    localStorage.removeItem("jokes")//borrar de LocalStorage

}
const btnRemoveAll = document.createElement('button');
btnRemoveAll.textContent = 'Borrar todo'
btnRemoveAll.addEventListener ('click', ()=>{
    clearAll();
    mostrarJokes();
});

document.body.appendChild(btnRemoveAll)
mostrarJokes();
