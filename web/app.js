var app = angular.module("CannesReservation", ["ngTouch", "ngRoute"]);

app.controller('ReservationController', ['$scope', '$http', '$rootScope', '$q', function($scope, $http, $rootScope, $q) {
    var ctrl = this;
    ctrl.films = [];
    ctrl.calendar = [];
    ctrl.credit = 7;

    // Retrieve jsons data
    var promCalendar = $http.get("/data/prog.json");
    promCalendar.then(function(response){
        ctrl.calendar = response.data.prog;
    });

    var promFilm = $http.get("/data/films.json");
    promFilm.then(function(response){
        ctrl.films = response.data.films;
    });

    $q.all([promFilm, promCalendar]).then(function() {
        ctrl.linkFilmCalendar();

        ctrl.calendar.forEach(function(e) {
            console.log(e);
        });

    }, function() {
        console.error("OOPS !");
    });

    ctrl.checkIfSeanceIsHD = function(seance) {
        if(seance.length == 1) {
            ctrl.isHD = true;
        }
    };
    
    ctrl.linkFilmCalendar = function() {
        for (var i = 0; i < ctrl.calendar.length; i++) {
            for (var j = 0; j < ctrl.calendar[i].salles.length; j++) {
                for (var k = 0; k < ctrl.calendar[i].salles[j].seances.length; k++) {
                    if (ctrl.calendar[i].salles[j].seances[k].film !== 'null') {
                        film_id = parseInt(ctrl.calendar[i].salles[j].seances[k].film)
                        ctrl.calendar[i].salles[j].seances[k].film = ctrl.films[film_id]
                    } else {
                        ctrl.calendar[i].salles[j].seances[k].film = null
                    }
                }
            }
        }
    }
}]);