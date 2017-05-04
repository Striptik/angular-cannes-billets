var app = angular.module("CannesReservation", ["ngTouch", "ngRoute"]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'templates/index.html',
        controller: "FrontController",
        controllerAs: "ctrl",
        activetab: 'home'
    }).
    when('/game', {
        templateUrl: 'templates/reservation.html',
        controller: "ReservationController",
        controllerAs: "ctrl",
        activetab: 'reservation'
    })
}]);

app.controller('FrontController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

}]);

app.controller('ReservationController', ['$scope', '$http', '$rootScope', '$q', function($scope, $http, $rootScope, $q) {
    var ctrl = this;

    var promListing = $http.get("/data/prog.json");
    promListing.then(function(response){
        console.log(response.data.prog);
        ctrl.listings = response.data;
    });

    $q.all([promListing]).then(function() {
        console.log("Everything is loaded !");
    }, function() {
        console.error("OOPS !");
    });
}]);