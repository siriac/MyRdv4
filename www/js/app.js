// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app=angular.module('starter', ['ionic','ngCordova','ionic-datepicker','ion-floating-menu','jett.ionic.scroll.sista']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
});
app.config(function($stateProvider){
    $stateProvider.state("EnregistrementRdv",{
        url:"/enregistrement",
        templateUrl:"templates/Enregistrement.html",
        controller:"EntregistrementCtrl"

    });
    $stateProvider.state("ListeRdv",{
        url:"/listeRdv",
        templateUrl:"templates/ListeRdv.html"
    });
    $stateProvider.state("ListeRdvByDay",{
        url:"/listeRdvByDay",
        templateUrl:"templates/ListeRdvByDay.html"

    });
    $stateProvider.state("LecteurCodeBar",{
        url:"/lecteurCodeBar",
        templateUrl:"templates/LecteurCodeBar.html"
    });
    $stateProvider.state("InfoCodeBar",{
        url:"/infoCodeBar",
        templateUrl:"templates/InfoCodeBar.html"
    });
    $stateProvider.state("SauverCertificat",{
        url:"/sauverCertificat",
        templateUrl:"templates/SauverCertificat.html"
    });
    $stateProvider.state("InfoRdv",{
        url:"/infoRdv/:id",
        templateUrl:"templates/InfoRdv.html"
    });
    $stateProvider.state("ListeRdvByDate",{
        url:"/listeRdvByDate/:date",
        templateUrl:"templates/ListeRdvByDate.html"
    });
    $stateProvider.state("ListeRdvByNumeroImmatri",{
        url:"/listeRdvByNumeroImmatri/:Imma",
        templateUrl:"templates/ListeRdvByNumeroImmatri.html"
    });
    $stateProvider.state("ObtenirRdv",{
        url:"/obtenirRdv/:id",
        templateUrl:"templates/ObtenirRdv.html"
    });


});
app.controller("ScannerBarCodeCtrl",function($scope , $cordovaBarcodeScanner,$ionicActionSheet ){
    $scope.groupbynumero = {name:"Authentification par numero",show:false};
    $scope.groupbycodebar = {name:"Authentification par code Bar",show:false};
    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(groupbynumero) {
        groupbynumero.show = !groupbynumero.show;
    };
    $scope.isGroupShown = function(groupbynumero) {
        return groupbynumero.show;
    };
    $scope.toggleGroup = function(groupbycodebar) {
        groupbycodebar.show = !groupbycodebar.show;
    };
    $scope.isGroupShown = function(groupbycodebar) {
        return groupbycodebar.show;
    };
    $scope.ScanCodeBar=function () {
alert("okkk");
        $cordovaBarcodeScanner
            .scan()
            .then(function(barcodeData) {
                // Success! Barcode data is here
                $scope.BycodeBar=barcodeData.text;
            }, function(error) {
                // An error occurred
            });
    };
    $scope.testmodel=function(Bynumero){
        alert(Bynumero);
    };
    $scope.testmodel=function(bycodebar){
        alert(bycodebar);
    }
    $scope.showActionsheet = function() {
    $ionicActionSheet.show({
        titleText: 'ActionSheet Example',
        buttons: [
            { text: '<i class="icon ion-share"></i> Share' },
            { text: '<i class="icon ion-arrow-move"></i> Move' }
        ],
        destructiveText: 'Delete',
        cancelText: 'Cancel',
        cancel: function() {
            console.log('CANCELLED');
        },
        buttonClicked: function(index) {
            console.log('BUTTON CLICKED', index);
            return true;
        },
        destructiveButtonClicked: function() {
            console.log('DESTRUCT');
            return true;
        }
    });
};

});
app.controller("EntregistrementCtrl",function($scope,$http,$state){
    $scope.nom_photo="picture";

    $scope.lastDay=function(){

        $http({
            method: 'GET',
            url: 'http://localhost:8080/GenerateurRdvService/DateOfLastRdv',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept':'text/html','X-PINGOTHER':'pingpong'}

        }).success(function(data) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.lastDayRdv=data;


        }).error(function(data, status, headers, config) {

            alert("Could not save new person");
        });
    };
    $scope.AddRdv=function(rdv){
        var rdvz="";
        rdv.nom_photo="picture";
        var  response=$http.post('http://localhost:8080/GenerateurRdvService/EnregistrerRdv/'+rdv.nom_cli+'/'
            +rdv.num_citerne+'/'+rdv.num_immatri+'/'+rdv.type_rdv+'/'+rdv.Nom_Constructeur+
        '/'+rdv.Num_abrobation+'/'+rdv.Capa_nominal+'/'+rdv.Nbre_compartiment+'/'+rdv.num_tele+'/'+rdv.nom_photo);
        response.success(function(data){
          alert(data.num_rdv);
            $state.go("InfoRdv",{
                id:data.num_rdv

            });
        })
        response.error(function(data){
            alert("j ai pas reussi");
        });


    }




});
app.controller("SauverCertificatCtrl",function($scope,$cordovaCamera){
    $scope.pictureUrl='img/300.gif';

    $scope.printe=function(){
      alert("Bonjour");
    };
    $scope.takePicture=function(){
        //alert("je suis dans takepicture")
        var options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            quality: 60,
            allowEdit:false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 500,
            saveToPhotoAlbum: false,
            correctOrientation:true
        };

        $cordovaCamera.getPicture(options)
            .then(function(data){
                $scope.pictureUrl='data:image/jpeg;base64,'+data;
               // alert(data)
                $scope.base64=data;
        },function(error){
                console.log('camera error '+angular.toJson(error));

        });
    };

});
app.controller("ListByDayCtrl",function($scope, ionicDatePicker,$http){
    $scope.groupbynumero = {name:"Recherche Par Numero de rendez-vous",show:false};
    $scope.groupbydate = {name:"Recherche par Date",show:false};
    $scope.groupbynumImmatriculation = {name:"Recherche par Numero Immatriculation",show:false};
    $scope.toggleGroup = function(groupbynumImmatriculation) {
        groupbynumImmatriculation.show = !groupbynumImmatriculation.show;
    };
    $scope.isGroupShown = function(groupbynumImmatriculation) {
        return groupbynumImmatriculation.show;
    };
    $scope.toggleGroup = function(groupbynumero) {
        groupbynumero.show = !groupbynumero.show;
    };
    $scope.isGroupShown = function(groupbynumero) {
        return groupbynumero.show;
    };
    $scope.toggleGroup = function(groupbydate) {
        groupbydate.show = !groupbydate.show;
    };
    $scope.isGroupShown = function(groupbydate) {
        return groupbydate.show;
    };
    $scope.listesDays=[];
    $scope.cliente="";

    mainObj = {
        callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            $scope.date=new Date(val).getFullYear()+"-"+(new Date(val).getMonth()*1+1)+"-"+new Date(val).getDate();
        },
        disabledDates: [            //Optional
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ],
        from: new Date(2017, 1, 1), //Optional
        to: new Date(2999, 10, 30), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup',      //Optional
        showTodayButton: true,
        dateFormat: ' dd MM yyyy',
        closeOnSelect: false
    };
    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(mainObj);
    };
    $scope.findBydate=function(date){
        var  response=$http.get('http://localhost:8080/GenerateurRdvService/listesRdvsByDate/'+date);

        response.success(function(data){
           // alert(data +" "+"bonjour");
            $scope.listesDays=data;
        })
        response.error(function(data){
            alert(error+""+data);
        });
    };
    $scope.findByNumber=function(Number){
        //alert(Number);
        var  response=$http.get('http://localhost:8080/GenerateurRdvService/ObtenirRdv/'+Number);

        response.success(function(data){
            // alert(data +" "+"bonjour");
            $scope.cliente=data;
        })
        response.error(function(data){
            alert(error+""+data);
        });
    };
    $scope.findByImma=function(Imma){
        //alert(Imma);
        var  response=$http.get('http://localhost:8080/GenerateurRdvService/listesRdvsByImmatr/'+Imma);

        response.success(function(data){
            // alert(data +" "+"bonjour");
            $scope.listesDays=data;
        })
        response.error(function(data){
            alert(error+""+data);
        });
    };
});
app.controller("InfoRdvCtrl",function($scope,$stateParams,$http){
    $scope.id=$stateParams.id;
    var response=$http.get('http://localhost:8080/GenerateurRdvService/ObtenirRdv/'+$scope.id);
    response.success(function(data){
        $scope.rendez=data;
    })
     response.error(function(data){

     });
});
