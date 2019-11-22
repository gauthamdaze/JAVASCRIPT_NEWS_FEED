var feedList = document.querySelector('#feed');
var searchBar = document.getElementById('searchBar');
//default search 
text = 'everything';

// Data fetch
var loadMore = function(text) {
    var xhttp;
    let searchString = text;
    let query ='';

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.responseText);
            if(searchString != 'everything'){
            addtToList(res,true,searchString);
            }
            else{
                addtToList(res,false);
            }
        }
    };
    xhttp.open("GET", 'https://newsapi.org/v2/everything?' +
    'q=('+searchString+')&'+
    'from=2019-11-09&' +
    'sortBy=popularity&' +
    'apiKey=bc1efba457af4251b36161ca5f24d779');
    xhttp.send();
    event.preventDefault();

}

//search Event handling

const input = document.querySelector('#searchIcon');
var list = document.getElementsByTagName('li');

input.addEventListener('click', function() {
     text = searchBar.value;
    loadMore(text);
});

searchBar.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        text = searchBar.value;
    loadMore(text);
    }
});

//***************************** Feed List ************************************//

var addtToList = function(items,searchmade,searchString) {
  // if search is made remove the exisiting feed and append new feed
  var fragment = new DocumentFragment();
        if(searchmade){
            var myList = document.getElementById('feed');
            myList.innerHTML = '';
            searchBar.value = searchString;
        }
        for (var i = 0; i < items.articles.length; i++) {
            var item = document.createElement('li');
            var img = document.createElement("IMG");
            var headlineLink = document.createElement('a');
            img.setAttribute("src", items.articles[i].urlToImage);
            img.setAttribute("width", "70");
            img.setAttribute("height", "auto");
            headlineLink.setAttribute('href', items.articles[i].url);
            headlineLink.innerHTML = items.articles[i].title;            
            item.appendChild(img);
            item.appendChild(headlineLink);
            fragment.appendChild(item);
            
        }
        feedList.appendChild(fragment);
}

// Detect when scrolled to bottom.

feedList.addEventListener('scroll', function() {
    if (feedList.scrollTop + feedList.clientHeight >= feedList.scrollHeight) {
        loadMore(text);
    }
});

// nav bar 

var sportTab  = document.querySelector('#sports');
sportTab.addEventListener('click',function(){
    loadMore('Sports');
})
var eduTab =document.querySelector('#education').addEventListener('click',function(){
    loadMore('Education');
})
var techTab =document.querySelector('#tech').addEventListener('click',function(){
    loadMore('Technology');
})
var polTab = document.querySelector('#politics').addEventListener('click',function(){
    loadMore('Politics');
})


//Initially load some feed.
window.onload = function() {
    loadMore(text);
  };

  // Auto refresh 
 setInterval(function(){
    var myList = document.getElementById('feed');
    myList.innerHTML = '';
    loadMore(text);
 },30000)