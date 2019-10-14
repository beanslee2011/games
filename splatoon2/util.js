function randomFrom(array) {
  return array[Math.floor(Math.random()*array.length)]
}

function filter_available(item) {
  return !item.unreleased
}

var language_map = {
	"ja_JP": "/splatoon2/",
  "en_US": "/splatoon2/mode.html",
  "ui":"/splatoon2/ui.html",
   "fr_CA":"/splatoon2/mainwep.html",
  "fr_FR": "/splatoon2/subwep.html",
  "es_ES": "/splatoon2/skill.html",
  "stage":"/splatoon2/stage.html",
  "record":"/splatoon2/personal.html",
  "es_MX": "/index.html",
  "amiibo":"/splatoon2/amiibo.html",
  "ability":"/splatoon2/ability.html"
  
  
}

String.prototype.format = function(scope) {
    eval(Object.keys(scope).map(
        function(x) { return "var " + x + "=scope." + x
    }).join(";"));
    return this.replace(/{(.+?)}/g, function($0, $1) {
        return eval($1);
    })
};

angular.module('splatApp').util = function($scope, $sce) {
  // this only works when each language is moved to a directory setup like above (ie in distribution on loadout.ink)
  $scope.redirect = function(lang) {
    var dir = language_map[lang]
    var URL = window.location.protocol + "//"+ window.location.hostname +":"+ window.location.port  + dir 
    //if (lang == "ja_JP"){
    	//if(window.location.hash) URL += window.location.hash;
    		//if (typeof(Storage) !== "undefined") {
      		//localStorage.selectedLang = lang;
    //}
  //}
  window.location = URL; 
  }

 $scope.redirectToGoogle = function () {
        $window.location('https://www.google.com');
    }
  $scope.renderHtml = function(html_code) {
    return $sce.trustAsHtml(html_code);
  };
}
