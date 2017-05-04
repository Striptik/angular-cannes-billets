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

app.controller('ReservationController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    var ctrl = this;

    var promListing = $http.get("/data/prog.json");
    promListing.then(function(response){
        ctrl.listings = response.data.date;
    });
}]);