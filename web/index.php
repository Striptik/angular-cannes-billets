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
    <div class="all">
        <div class="container">
            <div class="row">
                <div class="table-responsive">
                    <table ng-controller="ReservationController as ctrl">
                        <tr>
                            <th class="empty"> </th>
                            <th class="salles">Debussy</th>
                            <th colspan=7>Lumière</th>
                        </tr>
                        <tr>
                            <td class="date">samedi 14</td>
                            <td>
                                <!-- single -->
                                <div class="film">
                                    <div class="film-title">Titre</div>
                                    <div class="film-realisateur">Réalisateur</div>
                                    <div class="film-horaire">08:30</div>
                                    <div class="film-demande">demander</div>
                                </div>
                                <!-- /single -->
                            </td>
                            <td>film 2</td>
                            <td class="orange">film 3</td>
                            <td class="empty empty-bg"></td>
                            <td>film 4</td>
                            <td class="gris">film 5</td>
                            <td>film 6</td>
                            <td class="empty empty-bg"></td>
                        </tr>
                        <tr ng-repeat="day in ctrl.calendar | filter:q as results">
                            <td>{{day.date | date: 'EEEE'}} {{day.date | date: 'd'}}</td>
                            <td ng-if="results.length > 0"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>