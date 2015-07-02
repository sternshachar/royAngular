
angular.module("royApp")
  .controller("mainCtrl", function($scope,$http,$location){
   

    $scope.tabsMain = { tabNum : 0 ,page: $location.url().substr(1)};
    //console.log($scope.tabsMain);
            $http.get("practice.json").success(function(data){
              $scope.practiceTabs = data.practice;
              $scope.aboutTabs = data.about;
              $scope.staffTabs = data.staff;
              $scope.newsTabs = data.news;
              $scope.newsGroups = data.newsGroups;
              //console.log(data);

                    switch($scope.tabsMain.page){
                      case 'practice':
                        $scope.tabs = $scope.practiceTabs;
                        $scope.news = false;
                        break;
                      case 'about':
                      case 'principles':
                        $scope.tabs = $scope.aboutTabs;
                        $scope.news = false;
                        break;
                      case 'staff':
                        $scope.tabs = $scope.staffTabs;
                        $scope.news = false;
                        break;
                      case 'news':
                      case 'update':
                        $scope.tabs = $scope.newsTabs;
                        $scope.news = true;
                        break;
                    };

                     console.log("http done");

            });

    $scope.changeTab = function(tabNumber,page){
      $scope.tabsMain.tabNum = tabNumber;
      $scope.tabsMain.page = page;
       console.log("changeTab invoked");
      switch($scope.tabsMain.page){
        case 'practice':
          $scope.tabs = $scope.practiceTabs;
          $scope.news = false;
          break;
        case 'about':
          $scope.tabs = $scope.aboutTabs;
          $scope.news = false;
          break;
        case 'staff':
          $scope.tabs = $scope.staffTabs;
          $scope.news = false;
          break;
        case 'news':
          $scope.tabs = $scope.newsTabs;
          $scope.news = true;
          break;

      };

      for (var i = 0; i < $scope.tabs.length; i++) {
        $scope.tabs[i].active = $scope.tabsMain.tabNum == i ? true : false;
      }
      $scope.$broadcast("tabUpdate",$scope.tabsMain);
    }

    $scope.collape = {};
    $scope.collape.isCollapsed = {};
    //console.log("mainCtrl");
  })

  .controller("dropdownMenusCtrl",function($scope){



  })

  .controller("carouselCtrl",function($scope,$interval){
    $scope.myInterval = 10000;
    
    var slides = $scope.slides = [
      {image: 'images/notes.jpg', head: 'יצירתיות', text: '' ,active: true},
      {image: 'images/city.jpg', head: 'פרספקטיבה', text: '' , active: false},
      {image: 'images/bird.jpg', head: 'קרקע איתנה', text: '', active: false}    
      ];

      $scope.autoSlide = function(){
        for (var i = 0; i < $scope.slides.length; i++) {
          if($scope.slides[i].active){
            $scope.slides[i].active = false;
              if(i + 1 < $scope.slides.length)
                $scope.slides[i + 1].active = true;
              else
                $scope.slides[0].active = true;
              break;
            
            }
          }
        };

      $scope.changeSlide = function(direction){
        for (var i = 0; i < $scope.slides.length; i++) {
          if($scope.slides[i].active){
            $scope.slides[i].active = false;
            if(direction == 'next'){
              console.log('next');
              if(i + 1 < $scope.slides.length)
                $scope.slides[i + 1].active = true;
              else
                $scope.slides[0].active = true;
              break;
            }
            if(direction == 'prev'){
              console.log('prev');
              if(i - 1 >= 0)
                $scope.slides[i - 1].active = true;
              else
                $scope.slides[$scope.slides.length - 1].active = true;
              break;
            }

          }
        };
        
      }

      $scope.stackOn = function(index){
        return index > 0 ? "abs" : "";
      }

      var carouselInterval = $interval($scope.autoSlide,$scope.myInterval);
      console.log("carouselCtrl");
  })

.controller('CollapseCtrl', function ($scope,$window) {
  $scope.isCollapsed = true;
  $scope.$on('tabUpdate', function(){
    console.log($window.innerWidth);
    if($window.innerWidth < 500)
      $scope.isCollapsed = !$scope.isCollapsed;
    console.log($scope.isCollapsed);
  });
   console.log("CollapseCtrl");
});

angular.module('royApp').controller('tabsCtrl', function ($scope,$http) {
          

    $scope.selectedTab = $scope.tabsMain.tabNum;
    console.log($scope.selectedTab);

    $scope.$on("tabUpdate",function (event,args){
      //console.log(args);
      //console.log($scope.tabs);
      console.log("tabUpdate noticed");

    });


 console.log("tabsCtrl");

});


angular.module('royApp').controller('ModalCtrl', function ($scope, $modal, $log) {


  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'views/contact.html',
      controller: 'ModalInstanceCtrl',
    });

    modalInstance.result.then(function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('royApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('royApp').controller('AccordionCtrl', function ($scope) {
  $scope.oneAtATime = true;

  //$scope.newsGroups = $scope.newsTabs;
  console.log($scope.newsTabs);

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
    console.log("AccordionCtrl");
});