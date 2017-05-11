var app = angular.module("CannesReservation", ["ngTouch", "ngRoute"]);

app.controller('ReservationController', ['$scope', '$http', '$q', function($scope, $http, $q) {

    // Init
    var ctrl = this;
    ctrl.films = [];
    ctrl.calendar = [];
    ctrl.bookedFilms = [];
    ctrl.credit = 7;
    ctrl.id_unique = []

    // Retrieve jsons data
    var promCalendar = $http.get("/data/prog.json");
    promCalendar.then(function(response){
        ctrl.calendar = response.data.prog;
    });

    var promFilm = $http.get("/data/films.json");
    promFilm.then(function(response){
        ctrl.films = response.data.films;
    });

    // Waiting for loading
    $q.all([promFilm, promCalendar]).then(function() {
        // Associate films with ids in the calendar
        ctrl.linkFilmCalendar();

    }, function() {
        console.error("OOPS ! Error in Loading");
    });


    // Handle Booking
    $scope.bookFilm = function (seance, ev) {
        //Film already booked
        if (ctrl.bookedFilms.indexOf(seance.id) !== -1) {
            // If it's the good id_unique
            if (ctrl.id_unique.indexOf(seance.id_unique) !== -1) {
                var io = confirm('Voulez-vous supprimer ce film de vos réservations ?')
                // if user confirm
                if (io === true) {
                    //remove the booked film id
                    var pos_id = ctrl.bookedFilms.indexOf(seance.id)
                    ctrl.bookedFilms.splice(pos_id, 1)
                    //remove the booked film id_unique
                    var pos_idUnique = ctrl.id_unique.indexOf(seance.id_unique)
                    ctrl.id_unique.splice(pos_idUnique, 1)
                    //search films with same id
                    var sameFilmUnbooked = angular.element(document.querySelectorAll("[data-id='" + seance.id + "']"));
                    angular.forEach(sameFilmUnbooked, function (el, k) {
                        var unbooked = el.attributes.getNamedItem("class").value;
                        var classes = unbooked.split(" ");
                        var newClasses = ''
                        // Rewrite class without the booking classes
                        classes.forEach(function (c) {
                            console.log(c)
                            if (c != "filmBooked" && c != "selected") {
                                newClasses += c + " "
                            }
                        })
                        // set new elem without bad classes
                        var newElem = document.createAttribute("class");
                        newElem.value = newClasses;
                        el.attributes.setNamedItem(newElem)
                    })
                    // return credit
                    if (seance.HD === '1') {
                        ctrl.credit += 2;
                    } else {
                        ctrl.credit += 1;
                    }
                }
        }
        // Film not booked
        } else {
            if (ctrl.id_unique.indexOf(seance.id_unique) === -1) {
                //Spend credits for High Demand seances
                if (seance.HD === '1') {
                    if (ctrl.credit >= 2) {
                        ctrl.credit -= 2
                        ctrl.continueBooking(seance, ev)
                    } else {
                        alert('Vous n\'avez pas le nombre de crédit nécessaire')
                    }
                // Spend credit for usual seances
                } else {
                    if (ctrl.credit >= 1) {
                        ctrl.credit -= 1
                        ctrl.continueBooking(seance, ev)
                    }
                    else {
                        alert('Vous n\'avez pas le nombre de crédit nécessaire')
                    }
                }
            }
        }
    }

    // To book After verification for the credits availble
    ctrl.continueBooking = function(seance, ev) {
        ctrl.bookedFilms.push(seance.id)
        ctrl.id_unique.push(seance.id_unique)
        // Find all film with sameId and add 'filmBooked'
        var sameFilm = angular.element(document.querySelectorAll("[data-id='"+seance.id+"']"));
        angular.forEach(sameFilm, function (el, k) {
            var booked = document.createAttribute("class")
            booked.value = el.attributes.getNamedItem("class").value + " filmBooked"
            el.attributes.setNamedItem(booked);
        })
        // Add 'selected' for Ze Film selected
        var zeFilm = angular.element(document.querySelector("[data-uniqueId='"+seance.id_unique+"']"));
        zeFilm.addClass('selected')
    }


    // Associate the Json
    ctrl.linkFilmCalendar = function() {
        var unique = 0;
        for (var i = 0; i < ctrl.calendar.length; i++) {
            for (var j = 0; j < ctrl.calendar[i].salles.length; j++) {
                for (var k = 0; k < ctrl.calendar[i].salles[j].seances.length; k++) {
                    if (ctrl.calendar[i].salles[j].seances[k].film !== 'null') {
                        film_id = parseInt(ctrl.calendar[i].salles[j].seances[k].film)
                        ctrl.calendar[i].salles[j].seances[k].film = ctrl.films[film_id]
                        ctrl.calendar[i].salles[j].seances[k].id = film_id
                        ctrl.calendar[i].salles[j].seances[k].id_unique = unique
                        unique++;
                    } else {
                        ctrl.calendar[i].salles[j].seances[k].film = null
                    }
                }
            }
        }
    }
}]);