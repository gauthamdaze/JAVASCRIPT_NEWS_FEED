var feedList = document.querySelector('#feed');

// Data fetch
var loadMore = function() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let res = JSON.parse(this.responseText);
            addtToList(res);
        }
    };
    xhttp.open("GET", 'http://newsapi.org/v2/top-headlines?' +
        'sources=bbc-news&' +
        'apiKey=bc1efba457af4251b36161ca5f24d779', true);
    xhttp.send();


}

//search Event handling

const input = document.querySelector('#searchBar');
var list = document.getElementsByTagName('li');

input.addEventListener('keyup', function() {
    var text = this.value;

    for (var i = 0; i < list.length; i++) {
        if (!list[i].innerText.toUpperCase().includes(text.toUpperCase())) {
            list[i].style.display = 'none';
        } else {
            list[i].style.display = 'block';
        }
    }

});

var addtToList = function(items) {
    for (var i = 0; i < items.totalResults; i++) {
        var item = document.createElement('li');
        var img = document.createElement("IMG");
        var headlineLink = document.createElement('a');
        img.setAttribute("src", items.articles[i].urlToImage);
        img.setAttribute("width", "70");
        img.setAttribute("height", "auto");
        headlineLink.setAttribute('href', items.articles[i].title);
        headlineLink.innerHTML = items.articles[i].title;
        item.appendChild(img);
        item.appendChild(headlineLink);
        feedList.appendChild(item);
    }
}

// Detect when scrolled to bottom.

feedList.addEventListener('scroll', function() {
    if (feedList.scrollTop + feedList.clientHeight >= feedList.scrollHeight) {
        loadMore();
    }
});


// Initially load some feed.
loadMore();