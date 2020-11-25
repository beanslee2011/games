function randomFrom(array) {
  return array[Math.floor(Math.random()*array.length)]
}

function filter_available(item) {
  return !item.unreleased
}

var language_map = {
  "en_US": "splatoon2/index.html",
  "fr_FR": "splatoon2/subwep.html",
  "ja_JP": "splatoon2/mode.html",
  "fr_CA": "splatoon2/skill.html",
  "es_ES": "splatoon2/ui.html",
  "es_MX": "splatoon2/mainwep.html",
  "homex": "index.html",
  "it_IT": "splatoon2/ability.html",
  "zh_HK": "splatoon2/amiibo.html",
  "record": "splatoon2/personal.html",
  "stage": "splatoon2/stage.html"

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
    var URL = window.location.protocol + "//"+ window.location.hostname + "/" + dir 
    if(window.location.hash) URL += window.location.hash;
    if (typeof(Storage) !== "undefined") {
      localStorage.selectedLang = lang;
    }
    window.location = URL;
  }

  $scope.renderHtml = function(html_code) {
    return $sce.trustAsHtml(html_code);
  };
}
