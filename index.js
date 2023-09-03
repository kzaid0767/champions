import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://champions-146bc-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "posts")



const inputEl = document.querySelector('#input-field')
const fromEl = document.querySelector('#from-input')
const toEl = document.querySelector('#to-input')
const publishBtn = document.querySelector('#publish-btn')
const postContainer = document.querySelector('#posts-container')

publishBtn.addEventListener('click', handleClick)

function handleClick(){
    let post = inputEl.value
    let from = fromEl.value
    let to = toEl.value
    if(post){
        push(itemsInDB, {post,from,to})
    }

    resetInputs()
}

function addPost({post,from,to}){
    postContainer.innerHTML += `<p>${post}</p>`
}

function resetInputs(){
    [inputEl.value,fromEl.value,toEl.value] = ['','','']
}
