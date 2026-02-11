const form = document.querySelector('#postForm');
const titleInput = document.querySelector('#title');
const submitHandler=async (e)=>{
    e.preventDefault();
    const res=await fetch("http://localhost:8000/api/posts",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({title:titleInput.value}),
    })
}
form.addEventListener('submit', submitHandler)
const getPostsBtn=document.querySelector('#getPosts');
const responseDiv=document.querySelector('#response');
const getPostsHandler=async ()=>{
    try{
        const res=await fetch("http://localhost:8000/api/posts");
        const data=await res.json();
        responseDiv.innerHTML=JSON.stringify(data);
    }
    catch(error){
        console.error("Error fetching posts:",error);
    }
}
getPostsBtn.addEventListener('click',getPostsHandler)