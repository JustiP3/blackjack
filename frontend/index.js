document.addEventListener("DOMContentLoaded", function(){
    let h1 = document.getElementsByTagName('h1')[0]

    h1.addEventListener('click', function(){
        h1.remove()
    })
})
