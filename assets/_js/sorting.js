var transparentImage = '{{ site.baseurl }}/assets/transparent.png';
var indexList = document.getElementById('index-list');
if(indexList) { sort('loadOrder'); }

function sort(method) {
  this[method]();
  var html = '';

  for(var i = 0; i < themes.length; i++) {
    if(!themes[i]) { continue; }

//    html += '<li>' +
//              '<a href="' + themes[i].url + '">' +
//                '<img class="thumb" src="' + transparentImage + '"' +
//                      'data-echo="'+ themes[i].thumbnail +'">' +
//                '<div>' + themes[i].title + '</div>' +
//              '</a>' +
//            '</li>';

    html += '<li class="index-item">' +
              '<a href="' + themes[i].url + '" class="index-link">' +
                '<div class="index-cell">' +
                  '<span class="index-date">' + themes[i].date + '</span>' +
                  '<h2 class="index-name">' + themes[i].title + '</h2>' +
                '</div>' +
              '</a>' +
              '<img src="' + themes[i].thumbnail + '" class="index-thumb" />' +
            '</li>';

  }

  indexList.innerHTML = html;
  echo.render();
  saveOrder();
}

function saveOrder() {
  var themeTitles = themes.map(function(theme) { return theme.title; });
  sessionStorage.setItem('order', JSON.stringify(themeTitles));
}

function loadOrder() {
  var newOrder = [];
  var themeTitles = JSON.parse(sessionStorage.getItem('order'));
  if(!themeTitles) { shuffle(); return; }

  themes.forEach(function(theme) {
    newOrder[themeTitles.indexOf(theme.title)] = theme;
  });

  themes = newOrder;
}

function shuffle() {
  var currentIndex = themes.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = themes[currentIndex];
    themes[currentIndex] = themes[randomIndex];
    themes[randomIndex] = temporaryValue;
  }
}

function alphabetical() {
  themes.sort(function(a, b){
    var titleA = a.title.toLowerCase();
    var titleB = b.title.toLowerCase();
    if(titleA < titleB) return -1;
    if(titleA > titleB) return 1;
    return 0;
  });
}

function reversealphabetical() {
  themes.sort(function(a, b){
    var titleA = a.title.toLowerCase();
    var titleB = b.title.toLowerCase();
    if(titleA > titleB) return -1;
    if(titleA < titleB) return 1;
    return 0;
  });
}

function latest() {
  themes.sort(function(a, b){
    if(a.date < b.date) return 1;
    if(a.date > b.date) return -1;
    return 0;
  });
}

function reverselatest() {
  themes.sort(function(a, b){
    if(a.date > b.date) return 1;
    if(a.date < b.date) return -1;
    return 0;
  });
}

function popularity() {
  themes.sort(function(a, b){
    return b.stars - a.stars;
  });
}
