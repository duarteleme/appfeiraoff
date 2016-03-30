angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

angular.module('expoinga', [
  'ionic',
  'ngSanitize',
  'ngCordova',
  'expoinga.common.directives',
  'expoinga.app.controllers',
  'expoinga.auth.controllers',
  'expoinga.app.services',
  'expoinga.views',
  'underscore',
  'angularMoment',
  'ngIOS9UIWebViewPatch'
])

// Enable native scrolls for Android platform only,
// as you see, we're disabling jsScrolling to achieve this.
.config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.scrolling.jsScrolling(true);
  }
})

.run(function($ionicPlatform, $ionicPopup, $rootScope, $ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'Problemas de Conexão',
          content: 'Desculpe, Porfavor, cheque sua internet.'
        })
        .then(function(result) {
          if(!result) {
            navigator.app.exitApp();
          }
        });
      }
    }

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
  //SIDE MENU ROUTES
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })

  .state('app.feed', {
    url: "/feed",
    views: {
      'menuContent': {
        templateUrl: "views/app/feed.html",
        controller: "FeedCtrl"
      }
    }
  })

  .state('app.profile', {
    cache: false,
    url: '/profile/:Id',
    views: {
      'menuContent': {
        templateUrl: "views/app/profile/profile.html",
        controller: 'eleicaoCtrl'
      }
    }
  })

  .state('app.profile.posts', {
    cache: true,
    url: '/posts/:id',
    views: {
      'profileContent': {
        templateUrl: 'views/app/profile/profile.posts.html',
        controller: 'eleicaoCtrl'
      }
    }
  })

  .state('app.profile.likes', {
    url: '/likes',
    views: {
      'profileContent': {
        templateUrl: 'views/app/profile/profile.likes.html'
      }
    }
  })

  .state('app.wp', {
    cache: false,
    url: "/wp",
    views: {
      'menuContent': {
        templateUrl: 'views/app/posts.html',
        controller: 'postsCtrl'
      }
    }
  })

  .state('app.postsDetalhe', {
    cache: false,
    url: '/postsDetalhe/:id',
    views: {
      'menuContent': {
        templateUrl: 'views/app/posts-detalhes.html',
        controller: 'postsCtrl'
      }
    }
  })

  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "views/app/profile/settings.html",
        controller: 'SettingsCtrl' 
      }
    }
  })

  .state('app.concurso', {
    cache: false,
    url: "/concurso",
    views: {
      'menuContent': {
        templateUrl: "views/app/concurso.html",
        controller: 'eleicaoCtrl'
      }
    } 
  })

  .state('app.show', {
    cache: false,
    url: "/show",
    views: {
      'menuContent': {
        templateUrl: "views/app/show.html",
        controller: 'showsCtrl'
      }
    }
  })

  .state('app.show-detalhe', {
    cache: false,
    url: "/show-detalhe/:id",
    views: {
      'menuContent': {
        templateUrl: "views/app/show-detalhe.html",
        controller: 'showsCtrl'
      }
    }
  })

  .state('app.infomapa', {
    url: "/infomapa",
    views: {
      'menuContent': {
        templateUrl: "views/app/infomapa.html"
      }
    }
  })

  .state('app.infogerais', {
    url: "/infogerais",
    views: {
      'menuContent': {
        templateUrl: "views/app/infogerais.html"
      }
    }
  })

  .state('app.infodesenho', {
    url: "/infodesenho",
    views: {
      'menuContent': {
        templateUrl: "views/app/infodesenho.html"
      }
    }
  })

  .state('app.shop', {
    cache: false,
    url: "/shop",
    abstract: true,
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/shop.html"
      }
    }
  })

  .state('app.shop.home', {
    cache: false,
    url: "/",
    views: {
      'shop-home': {
        templateUrl: "views/app/shop/shop-home.html",
        controller: 'ShopCtrl'
      }
    }
  })

  .state('app.shop.popular', {
    cache: false,
    url: "/popular",
    views: {
      'shop-popular': {
        templateUrl: "views/app/shop/shop-popular.html",
        controller: 'ShopCtrl'
      }
    }
  })

  .state('app.info', {
    url: "/info",
    views: {
      'menuContent': {
        templateUrl: "views/app/info.html"
      }
    }
  })

  .state('app.shop.sale', {
    url: "/sale",
    views: {
      'shop-sale': {
        templateUrl: "views/app/info.html",
      }
    }
  })

  .state('app.cart', {
    url: "/cart",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/cart.html",
        controller: 'ShoppingCartCtrl'
      }
    }
  })

  .state('app.shipping-address', {
    url: "/shipping-address",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/shipping-address.html",
        controller: "CheckoutCtrl"
      }
    }
  })

  .state('app.checkout', {
    url: "/checkout",
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/checkout.html",
        controller: "CheckoutCtrl"
      }
    }
  })

  .state('app.product-detail', {
    cache: false,
    url: '/shop/:id',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/product-detail.html",
        controller: 'paginasCtrl'
      }
    }
  })


  //AUTH ROUTES
  .state('facebook-sign-in', {
    url: "/facebook-sign-in",
    templateUrl: "views/auth/facebook-sign-in.html",
    controller: 'WelcomeCtrl'
  })

  .state('dont-have-facebook', {
    url: "/dont-have-facebook",
    templateUrl: "views/auth/dont-have-facebook.html",
    controller: 'WelcomeCtrl'
  })

  .state('create-account', {
    url: "/create-account",
    templateUrl: "views/auth/create-account.html",
    controller: 'CreateAccountCtrl'
  })

  .state('welcome-back', {
    url: "/welcome-back",
    templateUrl: "views/auth/welcome-back.html",
    controller: 'WelcomeBackCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/shop/');
  // $urlRouterProvider.otherwise('/app/feed');
});


// angular.module('expoinga').controller('cameraCtrl', function($scope, $ionicModal, $cordovaCamera) {
  
//   $scope.takePicture = function() {
//         var options = { 
//             quality : 90, 
//             destinationType : Camera.DestinationType.DATA_URL, 
//             sourceType : Camera.PictureSourceType.CAMERA, 
//             allowEdit : false,
//             encodingType: Camera.EncodingType.JPEG,
//             targetWidth: 300,
//             targetHeight: 300,
//             saveToPhotoAlbum: false,
//             correctOrientation:true
//         };
 
//         $cordovaCamera.getPicture(options).then(function(imageData) {
//             $scope.imgURI = "data:image/jpeg;base64," + imageData;
//         }, function(err) {
//             // An error occured. Show a message to the user
//         });

//         //$cordovaCamera.cleanup().then(); // only for FILE_URI
//     };


//   $ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
//     scope: $scope,
//     animation: 'slide-in-up'
//   }).then(function(modal) {
//     $scope.terms_of_service_modal = modal;
//   });

//   $scope.showTerms = function() {
//     $scope.terms_of_service_modal.show();
//   };

// });


angular.module('expoinga').controller('postsCtrl', function($scope, $ionicScrollDelegate, $timeout, $ionicLoading, ApiService) {

  $ionicLoading.show({
    content: 'Carregando',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 200
  });


  function postes () {
      ApiService._postes()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.postes = data;
        },1000);
      });
  }

  function postesGet () {
      ApiService._postesGet()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.postesGet = data;
        },1000);
      });
  }
    postes();
    postesGet(); 
});


angular.module('expoinga').controller('ShopCtrl', function($scope, $ionicScrollDelegate, $timeout, $ionicLoading, ApiService) {

  $ionicLoading.show({
    content: 'Carregando',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 200
  });


  function shop () {
      ApiService._shop()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.shop = data;
        },1000);
      });
  }

  function shopGet () {
      ApiService._shopGet()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.shopGet = data;
        },1000);
      });
  }

    shop();
    shopGet();
});

angular.module('expoinga').controller('eleicaoCtrl', function($scope, $cordovaDevice, $http, $ionicScrollDelegate, $timeout, $ionicLoading, ApiService) {

  $ionicLoading.show({
    content: 'Carregando',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 200
  });

  
  $scope.button_clicked  = false;

  $scope.votar = function() {    
    ApiService._votacao()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.votacao = data;
        },1000);
      });

    $scope.button_clicked = true;

    $scope.selectedButton = 0;
    
    $scope.isSelected = function($index) {
        return $scope.selectedButton === $index;
    };
    
    $scope.changeSelectedButton = function($index) {
        $scope.selectedButton = $index;
    };

  };

  function eleicao () {
      ApiService._eleicao()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.eleicao = data;
        },1000);
      });
  }

  function eleicaoGet () {
      ApiService._eleicaoGet()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.eleicaoGet = data;
        },1000);
      });
  }

    eleicao();
    eleicaoGet();
});



angular.module('expoinga').controller('paginasCtrl', function($scope, $ionicScrollDelegate, $timeout, $ionicLoading, ApiService) {

  $ionicLoading.show({
    content: 'Carregando',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 200
  });

  function paginas () {
      ApiService._paginas()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.paginas = data;
        },1000);
      });
  }

  function paginaGet () {
      ApiService._paginaGet()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.paginaGet = data;
        },1000);
      });
  }
    paginas();
    paginaGet(); 
});

angular.module('expoinga').controller('showsCtrl', function($scope, $timeout, $ionicLoading, ApiService) {
  
  $ionicLoading.show({
    content: 'Carregando',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 200
  });

  function shows () {
      ApiService._shows()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.shows = data;
        },1000);
      });
  }

  function showsGet () {
      ApiService._showsGet()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.showsGet = data;
        },1000);
      });
  }
    shows();
    showsGet(); 
})


 
.service('ApiService', function ($http, $stateParams) {

  var APIcms = 'http://www.expoinga.com.br/restrito/api/';
    
  eleicaoService = function () {
    return $http.get(APIcms + "eleicao.php?user=4");
  };

  eleicaoGetService = function () {
    return $http.get(APIcms + "eleicao.php?user=4", { 
      params: {
        id: $stateParams.id
      }
    });
  };


  shopService = function () {
    return $http.get(APIcms + "paginas.php?tipo=noticia&user=4");
  };

  shopGetService = function () {
    return $http.get(APIcms + "paginas.php?tipo=noticia&user=4&id=36");
  };

  paginasService = function () {
    return $http.get(APIcms + "paginas.php?tipo=pagina&user=4");
  };


  paginasGetService = function () {
    return $http.get(APIcms + "paginas.php?tipo=pagina&user=4", { 
      params: {
        id: $stateParams.id
      }
    });
  };

  showsGet = function () {
    return $http.get(APIcms + "eventos.php?tipo=show&user=4");
  };


  showsGetService = function () {
    return $http.get(APIcms + "eventos.php?tipo=show&user=4", { 
      params: {
        id: $stateParams.id
      }
    });
  };

  votacao = function () {
    //http://www.expoinga.com.br/restrito/controller/eleicaoController.php?votar=S&iduser=885522&candidata=20
    return $http.get("http://www.expoinga.com.br/restrito/controller/votacaoController.php", { 
      params: {
        //id: $stateParams.id
        id:"10",
        iduser: "000",
        candidata: $stateParams.id
      }
    });
  };

  postes = function () {
    //return $http.get("http://flaviovicente.com.br/wp-json/wp/v2/posts?page=1&per_page=10");
    return $http.get("http://flaviovicente.com.br/api/get_posts/");
  };

  postesGet = function () {
    return $http.get("http://flaviovicente.com.br/api/get_post/", { 
      params: {
        id: $stateParams.id
      }
    });
  };


  // posts = function () {
  //   return $http.get("http://flaviovicente.com.br/wp-json/wp/v2/posts?page=1&per_page=10");
  // };


  return {
    _postes : postes,
    _postesGet : postesGet,
    _votacao: votacao,
    _shop: shopService,
    _shopGet: shopGetService,
    _eleicao: eleicaoService,
    _eleicaoGet: eleicaoGetService,
    _paginas: paginasService,
    _paginaGet: paginasGetService,
    _shows: showsGet,
    _showsGet: showsGetService 
  };

});





