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
    ctrl.films = [];
    ctrl.calendar = [];

    var promCalendar = $http.get("/data/prog.json");
    promCalendar.then(function(response){
        ctrl.calendar = response.data.prog;
        //console.log(ctrl.calendar);
    });

    var promFilm = $http.get("/data/films.json");
    promFilm.then(function(response){
        ctrl.films = response.data.films;
        //console.log(ctrl.films)
    });


    $q.all([promFilm, promCalendar]).then(function() {
        console.log("Everything is loaded !");

        ctrl.linkFilmCalendar();
        console.log(ctrl.calendar)
        // Traiter les dates
        // Creer le calendrier

    }, function() {
        console.error("OOPS !");
    });

    ctrl.linkFilmCalendar = function() {
        for (var i = 0; i < ctrl.calendar.length; i++) {
            for (var j = 0; j < ctrl.calendar[i].salles.length; j++) {
                for (var k = 0; k < ctrl.calendar[i].salles[j].seances.length; k++) {
                    if (ctrl.calendar[i].salles[j].seances[k].film !== 'null') {
                        film_id = parseInt(ctrl.calendar[i].salles[j].seances[k].film)
                        ctrl.calendar[i].salles[j].seances[k].film = ctrl.films[0][film_id]
                    } else {
                        ctrl.calendar[i].salles[j].seances[k].film = null
                    }
                }
            }
        }
    }
}]);