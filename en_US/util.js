function randomFrom(array) {
  return array[Math.floor(Math.random()*array.length)]
}

function filter_available(item) {
  return !item.unreleased
}

var language_map = {
  "en_US": "en_US",
  "fr_FR": "fr",
  "ja_JP": "zh_CN",
  "fr_CA": "fr-ca",
  "es_ES": "es",
  "es_MX": "es-mx"
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
    var URL = window.location.protocol + "//"+ window.location.hostname + ":8888/" + dir + "/"
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
