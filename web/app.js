var app = angular.module("CannesReservation", ["ngTouch", "ngRoute"]);

app.controller('ReservationController', ['$scope', '$http', '$rootScope', '$q', function($scope, $http, $rootScope, $q) {
    var ctrl = this;
    ctrl.films = [];
    ctrl.calendar = [];
    ctrl.isHD = false;

    var promCalendar = $http.get("/data/prog.json");
    promCalendar.then(function(response){
        ctrl.calendar = response.data.prog;
        console.log(ctrl.calendar);
    });

    var promFilm = $http.get("/data/films.json");
    promFilm.then(function(response){
        ctrl.films = response.data.films;
        console.log(ctrl.films)
    });

    //var date = ctrl.films.substring(8,10);
    //ctrl.films.push(newRow);

    $q.all([promFilm, promCalendar]).then(function() {
        console.log("Everything is loaded !");

        // Traiter les dates
        // Creer le calendrier
        var test = ctrl.calendar[0].salles[1].seances[4].HD
        //console.log(ctrl.calendar[0].salles[1].seances[4].HD);

        ctrl.calendar.forEach(function(e) {
            console.log(e);
            //ctrl.checkIfSeanceIsHD(test);
        });

    }, function() {
        console.error("OOPS !");
    });



    ctrl.checkIfSeanceIsHD = function(seance) {
        if(seance.length == 1) {
            ctrl.isHD = true;
        }
        console.log(ctrl.isHD);
    };
}]);