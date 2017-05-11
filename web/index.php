<!doctype html>
<html lang="fr" ng-app="CannesReservation">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="app.css">

    <!-- JS -->
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-touch/angular-touch.min.js"></script>
    <script src="bower_components/angular-route/angular-route.min.js"></script>
    <script src="bower_components/angular-i18n/angular-locale_fr-fr.js"></script>
    <script src="app.js"></script>

    <title>Réservation Festival Cannes</title>
</head>
<body>
    <nav class="header">
        <img src="images/logo-festival-de-cannes.png" height="50" class="d-inline-block align-top" alt="">
        <h1>Festival de Cannes - Réservations</h1>
    </nav>
    <div class="all" ng-controller="ReservationController as ctrl">
        <div class="container">
            <div class="row">
                <div class="credit"> <b>Il vous reste {{ ctrl.credit }} credits.</b> </div>
                <div class="table-responsive">
                    <table>
                        <tr>
                            <th class="empty"> </th>
                            <th class="salles">Debussy</th>
                            <th colspan=7>Lumière</th>
                        </tr>
                        <tr ng-repeat="day in ctrl.calendar">
                            <td class="date">{{day.date | date: 'EEEE'}} {{day.date | date: 'd'}}</td>
                            <td ng-if="">{{day.salles[0].seances[0].Heure}}</td>
                            <td ng-repeat="seance in day.salles[1].seances">
                                <div class="empty empty-bg" ng-if="seance.film == null"></div>
                                <div class="film" ng-click="bookFilm(seance, $event)" ng-if="seance.film != null" data-id="{{seance.id}}">
                                    <div class="color-action"></div>
                                    <div class="film-title">{{seance.film.name}}</div>
                                    <div class="film-realisateur">{{seance.film.real}}</div>
                                    <div class="film-horaire">{{seance.Heure}}</div>
                                    <div class="film-demande">demander</div>
                                    <div class="hd" ng-if="seance.HD==1"></div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>