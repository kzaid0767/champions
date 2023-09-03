import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,child, remove, set, get,update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

//fetching from firebase
onValue(itemsInDB, function(snapshot){
    //making array from snapshot values
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val()).reverse()
        clearPosts()
        
        for(let thing of itemsArray){
            addPost(thing)
        }

        addClicking()
    } else postContainer.innerHTML = `<p> No posts to show!</p>`
})

publishBtn.addEventListener('click', handleClick)

function handleClick(){
    let post = inputEl.value
    let from = fromEl.value
    let to = toEl.value
    if(post){
        push(itemsInDB, {post,from,to,likes:0})
    }

    resetInputs()
}

function addPost(value){
    let newHTML = `
        <div class="single-post">
            <span class="span-to">To: ${value[1].to}</span>
            <p class="paragraph">${value[1].post} </p>
            <div class="post-bottom">
                <span class="span-from">From: ${value[1].from}</span>
                <span><i class="fa fa-heart" id="${value[0]}"></i> ${value[1].likes}</span>
            </div>
        </div>
    `
    postContainer.innerHTML += newHTML
    
}

function clearPosts(){
    postContainer.innerHTML  = ''
}

function resetInputs(){
    [inputEl.value,fromEl.value,toEl.value] = ['','','']
}

//clicking to each fa icon
function addClicking(){
    for(let element of document.getElementsByClassName('fa')){
        element.addEventListener('click', (e)=>handleLikes(e))
    }
}

function handleLikes(e){
    let id = e.target.id
    let wasLiked = JSON.parse(localStorage.getItem(`${id}`))
    if (!wasLiked){
        let from
        let likes
        let post
        let to
        // getting post using id and increasing likes count
        get(child(itemsInDB,`${id}`)).then((snapshot)=>{
            if(snapshot.exists()){
                from = snapshot.val().from
                likes = snapshot.val().likes + 1
                post = snapshot.val().post
                to = snapshot.val().to
                // line below updates to new state
                set(child(itemsInDB,`${id}`),{from,likes,post,to})
                localStorage.setItem(`${id}`, JSON.stringify(true))
            } else {
                console.log('no data')
            }
        })
    }
    


}
