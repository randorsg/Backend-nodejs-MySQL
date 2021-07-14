var mainApp = angular.module('mainApp', []);


mainApp.controller('mainCtrl', function($scope, $http, $templateCache) {
  $scope.searchString = "";
  $scope.isError = false;
  var clickToOpen = true;
  $scope.clickClose = function(){
    closeNav();
  }
  $scope.clickSearch = function(){
    if (clickToOpen) {
      clickToOpen = false;
      openNav();
    }else {
      getDataFromSpotify($scope.searchString);
      closeNav();
    }
  }

  $scope.sortGlyph = "glyphicon glyphicon-sort-by-alphabet";
  $scope.reverse = false;
  $scope.sortType = 'name';
  $scope.sortBy = function(type){
    $scope.reverse = ($scope.sortType === type) ? !$scope.reverse : false;
    $scope.sortType = type;

    if($scope.reverse){
      $scope.sortGlyph = "glyphicon glyphicon-sort-by-alphabet-alt";
    }else{
      $scope.sortGlyph = "glyphicon glyphicon-sort-by-alphabet";
    }
  }


  var getDataFromSpotify = function(searchString){
    $scope.url = 'https://api.spotify.com/v1/search?q=' + searchString + '&type=track&limit=50';
    $http(
      {
        method: 'GET',
        url: $scope.url,
        cache: $templateCache
      }
    ).then(function(response) {
        console.log(response.status);
        if(response.status == 200){
          var data = response.data;
          $scope.tracks = data.tracks.items;
          console.log($scope.tracks);
        }else {
          console.log(response.status);
          $scope.isError = true;
        }

      }, function(response) {
        console.log(response.status);
        $scope.isError = true;
    });
  }


  /* Open when someone clicks on the span element */
  var openNav = function() {
      document.getElementById("myNav").style.width = "100%";
      document.getElementById("search-box").style.display = "block";
      document.getElementById("closebtn").style.display = "block";
  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  var closeNav = function() {
      clickToOpen = true;
      document.getElementById("myNav").style.width = "8%";
      document.getElementById("search-box").style.display = "none";
      document.getElementById("closebtn").style.display = "none";
  }

});
