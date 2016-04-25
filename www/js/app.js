angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

angular.module('expoinga', [
  'ionic',
  'ngSanitize',
  'ngCordova',
  //'ngCordovaOauth',
  'expoinga.common.directives',
  'expoinga.app.controllers',
  //'expoinga.auth.controllers',
  'expoinga.app.services',
  //'expoinga.views',
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
    if(ionic.Platform.isIOS()){
      setTimeout(function(){
        navigator.splashscreen.hide();
      }, 3000 - 1000);
    }
    
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
    templateUrl: "views/app/side-menu.html"
  })



  .state('app.sorteios-lista', {
    cache: false,
    url: '/sorteios-lista/:tipo',
    views: {
      'menuContent': {
        templateUrl: 'views/app/sorteios-lista.html',
        controller: 'programacaoCtrl'
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

  .state('app.julgamentos', {
    cache: false,
    url: '/julgamentos/:tipo',
    views: {
      'menuContent': {
        templateUrl: 'views/app/julgamentos.html',
        controller: 'programacaoCtrl'
      }
    }
  })
  
  .state('app.programacao', {
    cache: false,
    url: '/programacao/:tipo',
    views: {
      'menuContent': {
        templateUrl: 'views/app/programacao.html',
        controller: 'programacaoCtrl'
      }
    }
  })

  .state('app.eventos', {
    cache: false,
    url: '/eventos/:tipo',
    views: {
      'menuContent': {
        templateUrl: 'views/app/programacao-eventos.html',
        controller: 'programacaoCtrl'
      }
    }
  })

  .state('app.leiloes', {
    cache: false,
    url: '/leiloes/:tipo',
    views: {
      'menuContent': {
        templateUrl: 'views/app/programacao-leiloes.html',
        controller: 'programacaoCtrl'
      }
    }
  })

  .state('app.programacao-detalhe', {
    cache: false,
    url: '/programacao-detalhe/:id/:item',
    views: {
      'menuContent': {
        templateUrl: 'views/app/programacao-detalhe.html',
        controller: 'programacaoCtrl'
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

  .state('app.feeds', {
    cache: false,
    url: "/feeds",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds.html",
        controller: 'feedsCtrl'
      }
    }
  })

  .state('app.noticias', {
    cache: false,
    url: "/noticias",
    views: {
      'menuContent': {
        templateUrl: "views/app/noticias.html",
        controller: 'NoticiasCtrl'
      }
    }
  })

  .state('app.noticia-detalhe', {
    cache: false,
    url: "/noticia-detalhe/:id",
    views: {
      'menuContent': {
        templateUrl: "views/app/noticia-detalhe.html",
        controller: 'NoticiasCtrl'
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

  

  

  .state('app.otema', {
    cache: false,
    url: '/shop/1',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/otema.html"
      }
    }
  })

  .state('app.presidente', {
    cache: false,
    url: '/shop/presidente',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/presidente.html"
      }
    }
  })

  .state('app.parque', {
    cache: false,
    url: '/shop/parque',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/parque.html"
      }
    }
  })

  .state('app.arena', {
    cache: false,
    url: '/shop/arena',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/arena.html"
      }
    }
  })

  .state('app.prefeito', {
    cache: false,
    url: '/shop/prefeito',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/prefeito.html"
      }
    }
  })

  .state('app.camarote', {
    cache: false,
    url: '/shop/camarote',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/camarote.html"
      }
    }
  })

  .state('app.mapadevisitantes', {
    cache: false,
    url: '/shop/mapadevisitantes',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/mapadevisitantes.html"
      }
    }
  })

  .state('app.numeros', {
    cache: false,
    url: '/shop/numeros',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/numeros.html"
      }
    }
  })

  .state('app.hotel', {
    cache: false,
    url: '/shop/hotel',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/hotel.html"
      }
    }
  })

  .state('app.mediasocial', {
    cache: false,
    url: '/shop/mediasocial',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/socialmedia.html"
      }
    }
  })

  .state('app.merchan', {
    cache: false,
    url: '/shop/merchan',
    views: {
      'menuContent': {
        templateUrl: "views/app/shop/merchan.html"
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
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/shop/');
  // $urlRouterProvider.otherwise('/app/feed');
});


angular.module('expoinga').controller('feedsCtrl', function($scope, $ionicScrollDelegate, $timeout, $ionicLoading, ApiService) {

  $ionicLoading.show({
    content: 'Carregando',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 200
  });


  function feeds () {
      ApiService._feeds()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.feeds = data;
        },1000);
      });
  }
    feeds(); 
});



angular.module('expoinga').controller('programacaoCtrl', function($scope, $ionicScrollDelegate, $timeout, $ionicLoading, ApiService) {

  $ionicLoading.show({
    content: 'Carregando',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 200
  });


  function programacao () {
      ApiService._programacao()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.programacao = data;
        },1000);
      });
  }

  function programacaoGet () {
      ApiService._programacaoGet()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.programacaoGet = data;
        },1000);
      });
  }
    programacao();
    programacaoGet(); 
});

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


angular.module('expoinga').controller('NoticiasCtrl', function($scope, $ionicScrollDelegate, $timeout, $ionicLoading, ApiService) {

  $ionicLoading.show({
    content: 'Carregando',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 200
  });


  function noticia () {
      ApiService._noticia()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.noticia = data;
        },1000);
      });
  }

  function noticiaGet () {
      ApiService._noticiaGet()
      .success(function (data) {
        $timeout(function () {
        $ionicLoading.hide();
          $scope.noticiaGet = data;
        },1000);
      });
  }

    noticia();
    noticiaGet();
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

angular.module('expoinga').controller('eleicaoCtrl', function($scope, $http, $ionicScrollDelegate, $timeout, $ionicLoading, ApiService) {

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
});


angular.module('expoinga').service('UserService', function () {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});
  


angular.module('expoinga').service('ApiService', function ($http, $stateParams) {

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

  
  apphomeGet = function () {
    return $http.get(APIcms + "noticias.php?tipo=apphome&user=4&id=0");
  };


  apphomeGetService = function () {
    return $http.get(APIcms + "noticias.php?tipo=apphome&user=4", { 
      params: {
        id: $stateParams.id
      }
    });
  };


  
 // programacao = function () {
 //   return $http.get(APIcms + "eventos.php?&user=4&id=");
 // };

  programacao = function () {
    return $http.get(APIcms + "eventos.php?&user=4", { 
      params: {
        id: '0',
        tipo: $stateParams.tipo
      }
    });
  };


  programacaoGet = function () {
    return $http.get(APIcms + "eventos.php?&user=4", { 
      params: {
        id: $stateParams.id
      }
    });
  };

  showsGet = function () {
    return $http.get(APIcms + "show.php?tipo=show&user=4&id=0");
  };


  showsGetService = function () {
    return $http.get(APIcms + "show.php?tipo=show&user=4", { 
      params: {
        id: $stateParams.id
      }
    });
  };

  noticia = function () {
    return $http.get(APIcms + "noticias.php?tipo=imprensa&user=4&id=0");
  };


  noticiaGet = function () {
    return $http.get(APIcms + "noticias.php?tipo=imprensa&user=4", { 
      params: {
        id: $stateParams.id
      }
    });
  };

  votacao = function () {
    return $http.get("http://www.expoinga.com.br/restrito/controller/votacaoController.php", { 
      params: {
        id:"10",
        iduser: "000",
        candidata: $stateParams.id
      }
    });
  };

  feeds = function () {
    return $http.get(APIcms + "banner.php?&user=4&categoria=feed");
  };


  return {
    _feeds : feeds,
    _programacao : programacao,
    _programacaoGet : programacaoGet,
    _noticia : noticia,
    _noticiaGet : noticiaGet,
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





