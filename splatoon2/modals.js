angular.module('splatApp').controller('ModalCtrl', function($scope, $uibModal, $log) {
  $scope.animationsEnabled = true;


  var templates = {
    weaponPickerNew : `
    <div class="row">
    <div class="col-md-12">
    <div class="card neonstripes" id="dialog">
    <div class="row cardheader">
    武器选择
    </div>
    <div class="row">
    <div class="col-md-4">
    <div class="row">
    <div class="col-md-12 col-sm-8">
    <img id="weapon-picker-selected" fallback-img ng-src="{{selectedWeapon.image}}" />
    </div>
    <div class="col-md-12 col-sm-6">
    <div class="selected-label">
    <span>{{selectedWeapon.localizedName['ja_JP']}}</span></div>
    <div class="col-md-12">
    <div class="row">
    <div class="col-xs-4 nopadding">
    <img ng-src="{{getSubIcon(selectedWeapon.sub)}}" uib-tooltip="{{getSubByName(selectedWeapon.sub).localizedName['ja_JP']}}" tooltip-append-to-body="true"  class="subspeicon" />
    </div>
    <div class="col-xs-8 nopadding">
    <div class="subspe-bubble">
    <img ng-src="{{getSpecialIcon(selectedWeapon.special)}}" uib-tooltip="{{getSpecialByName(selectedWeapon.special).localizedName['ja_JP']}}" tooltip-append-to-body="true" class="subspeicon" />
    {{selectedWeapon.specialCost}}p 
    </div>
    </div>
    </div>
    </div>
 
     
    <div class="col-md-12" id="minibar-container">
    <div class="row" ng-repeat="(stat,value) in selectedWeapon.stats">
    <div class="col-sm-6 col-xs-3 nopadding minibar-label readable">
    {{stat}}
    </div>
    <div class="col-sm-6 col-xs-9 nopadding">
    <uib-progressbar max="100" type="pink" value="value" class="statbar mini" />
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="col-md-8 picker-right">
    <div class="row">
    <div class="col-md-12">
    <select class="form-control dropdown-toggle" data-ng-options="x.localizedName['ja_JP'] for x in weaponSets" data-ng-model="selectedSet" ng-change="switchSet()"></select>
    </div>
    </div>
    <div class="col-md-12">
    <div class="row">
    <div class="picker">
    <div class="gear-wrapper" ng-repeat="weapon in availableWeapons()">
    <img class="gear-icon" ng-src="{{::weapon.image}}" ng-click="selectWeapon(weapon)" uib-tooltip="{{::weapon.localizedName['ja_JP']}}" tooltip-append-to-body="true"/>
    </div>
    </div>
    </div>
    </div>
    </div>
  
    </div>
   可用等级:{{selectedWeapon.level}} 墨水消耗:{{selectedWeapon.inkSaver}}  射速:{{selectedWeapon.speedLevel}}
    
    <div class="row buttons">
    <div class="col-xs-6 button-left">
    <button class="btn" type="button" ng-click="ok()">确定</button>
    </div>
    <div class="col-xs-6 button-right">
    <button class="btn" type="button" ng-click="cancel()">取消</button>
    </div>
    </div>
    </div>
    </div>
    `,
    gearPicker : `<div class="row">
    <div class="col-md-12">
    <div class="card {{::background}}" id="dialog">
    <div class="row cardheader">
    装备选择
    </div>
    <div class="row">
    <div class="col-md-4">
    <div class="row">
    <div class="col-md-12 col-sm-6">
    <img fallback-img ng-src="{{selectedGear.image}}" />
    </div>
    <div class="col-md-12 col-sm-6">
    <div class="selected-label" class="selected-label">
    <span>{{selectedGear.localizedName['en_US']}}</span></div>
    <div id="gearpicker-stats">
    <img ng-src="{{getSkillByName(selectedGear.main).image}}"/>  {{getSkillByName(selectedGear.main).localizedName['en_US']}}<br>
    <img ng-src="{{brands[selectedGear.brand].image}}"/> {{brands[selectedGear.brand].localizedName['en_US']}}<br>
    <div>
    <span ng-if="brands[selectedGear.brand].common">
    <span class="fa green fa-arrow-up"></span><img ng-src="{{getSkillByName(brands[selectedGear.brand].common).image}}"/>
    <span class="fa red fa-arrow-down"></span><img ng-src="{{getSkillByName(brands[selectedGear.brand].uncommon).image}}"/>
    </span>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="col-md-8 picker-right">
    <div class="picker">
    <div ng-click="selectGear(item)"  ng-repeat="item in filtered.primary track by item.id" uib-tooltip="{{::item.localizedName['en_US']}}" tooltip-append-to-body="true" class="gear-wrapper">
    <img class="gear-icon" ng-src="{{item.image}}"/>
    <span class="brand-icon">
    <img ng-src="{{::brands[item.brand].image}}"/>
    </span>
    <span class="main-icon">
    <img ng-src="{{::getSkillByName(item.main).image}}"/>
    </span>
    </div><!--
    --><div ng-click="selectGear(item)" ng-repeat="item in filtered.secondary track by item.id" uib-tooltip="{{::item.localizedName['en_US']}}" tooltip-append-to-body="true" class="gear-wrapper">
    <img class="gear-icon" ng-src="{{::item.image}}"/>
    <span class="brand-icon">
    <img ng-src="{{::brands[item.brand].image}}"/>
    </span>
    <span class="main-icon">
    <img ng-src="{{::getSkillByName(item.main).image}}"/>
    </span>
    <span class="annie">
    <img ng-if="item.brand != 'Grizzco'?item.name != 'Splatfest Tee'?true:false:false" src="../common/assets/img/misc/annie.png" tooltip-append-to-body="true" tooltip-placement="bottom" uib-tooltip="ゲソタウン限定"/>
    </span>
    </div><!--
    --><div ng-repeat="item in filtered.notEligible track by item.id" class="gear-wrapper">
    <img class="gear-icon" ng-src="{{::item.image}}"/>
    <span class="brand-icon">
    <img ng-src="{{::brands[item.brand].image}}"/>
    </span>
    <span class="main-icon">
    <img ng-src="{{::getSkillByName(item.main).image}}"/>
    </span>
    <span class="not-possible" uib-tooltip="不可选择主选项。" tooltip-append-to-body="true">
    <span class="fa fa-5x fa-ban " ng-if="!isPossibleMain(loadout.clothes.equipped,loadout.clothes.main.name)"></span>
    </span>
    </div>

    </div>
    </div>
    </div>
    <div class="row buttons">
    <div class="col-xs-6 button-left">
    <button class="btn" type="button" ng-click="ok()">确定</button>
    </div>
    <div class="col-xs-6 button-right">
    <button class="btn" type="button" ng-click="cancel()">取消</button>
    </div>
    </div>
    </div>
    </div>`,
    //TODO: split this into its own file
    whatsNew: `<div class="row">
    <div class="col-md-16">
    <div class="card basic purplestripes" id="dialog">
    <div class="row cardheader">
    说明
    </div>
    <div class="row basic-content">
    <div id="changelog"</div>
    基于原作者v1.1.1进行汉化和扩展 <br>
    装备配比器原作者简介:
    <li>作者devipotato为居住在美国亚利桑那州的24岁的妹子~~</li>
    <img src="./../common/assets/img/misc/author.png" align="middle" style="width:100px;height:100px;" />
    <li><a href="http://loadout.ink" target=blank">官方配比器网址loadout.ink(可能存在不能正常访问的情况)</a> </li>
    ########################################################
    <li>主要改动：<br>
       1.对武器、技能等进行汉化，增加新的武器显示；<br>
       2.增加少许武器详细信息显示；只保留英文和中文显示；<br>
       3.更换显示字体、个别图片；优化页面加载速度...<br>   
       <font size="3" color="orange">4.调整右上角菜单，增加主要界面菜单翻译(add at 20180221)、主武器推荐、副武器介绍、游戏模式、服装技能、当前对战地图（modi at 201804）、个人战历菜单(add at 20180122)、技能搭配、amiibo对应(add at 20180430)。</font><br>
       其中当前对战地图[每整点5分左右更新和个人战历数据使用[每日凌晨更新1次]基于python程序从splaoon2.ink的数据扒取解析获得。另同步模式改为由手机termux模式(手机电池不行了)换回公司的linux+python的方式(add at 20180221,modi at 201805)
     
</li> 
    <li><font size="3" color="orange">说明： 第一次访问页面加载慢是因为页面是通过无线路由映射的，so....</font><br>
        英语水平有限，难免翻译有误，希望理解。对战水平也不高，勿喷~~<br> ########################################################<br>本人FC号: SW-3153-5829-2020 </li>
       </li>
        
   
    </div>
    <div class="row buttons">
    <div class="col-xs-12">
    <button class="btn" type="button" ng-click="ok()">了解～</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    `,
    about: `<div class="row">
    <div class="col-md-12">
    <div class="card purplestripes" id="dialog">
    <div class="row cardheader">
    关于
    </div>
    <div class="row basic-content readable" id="about">
    <p>基于Python、AngularJS 1.6.5和Bootstrap 3开发.<br><br> 部分参考数据来自<a href='https://twitter.com/LeanYoshi' target='_blank'>Lean</a> ,splatoonwiki、Inkademy和Splatoon开发者。 </a><br><br> 装备配比器功能原作者:Devipotato<br>br<>汉化及其他新增功能作者:疾风</p>
    <div class="row buttons">
    <div class="col-xs-12">
    <button class="btn" type="button" ng-click="ok()">了解～</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    `
  }

  
    
  $scope.openWeaponPicker = function(size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: templates["weaponPickerNew"],
      windowTemplateUrl: 'blankModal.html',
      controller: 'WeaponPickerCtrl',
      size: size,
      resolve: {
        selectedSet: function() {
          return $scope.selectedSet;
        },
        weaponSets: function() {
          return $scope.weaponSets;
        },
        subs: function() {
          return $scope.subs;
        },
        selectedWeapon: function() {
          return $scope.loadout.weapon;
        },
        getSubByName: function() {
          return $scope.getSubByName;
        },
        getSpecialByName: function() {
          return $scope.getSpecialByName
        }
      }
    });

    modalInstance.result.then(function(results) {
      $scope.$parent.selectedSet=results.set; // ???
      $scope.$parent.loadout.weapon=results.weapon;
    }, function() {
      $log.info('Weapon picker cancelled');
    });
  };

 

  $scope.openChangelog = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: templates["whatsNew"],
      windowTemplateUrl: 'blankModal.html',
      controller: 'BasicCtrl'
      
    });

    modalInstance.result.then(function(results) {

    }, function() {

    });
  };

  $scope.openAbout = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: templates["about"],
      windowTemplateUrl: 'blankModal.html',
      controller: 'BasicCtrl'
    });

    modalInstance.result.then(function(results) {

    }, function() {

    });
  };

  $scope.openGearPicker = function(gear, equipped, slot) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      template: templates["gearPicker"],
      windowTemplateUrl: 'blankModal.html',
      controller: 'GearPickerCtrl',
      resolve: {
        slot: function() {
          return eval("$scope.loadout." + slot)
        },
        getSkillByName: function() {
          return $scope.getSkillByName
        },
        set: function() {
          return gear
        },
        brands: function() {
          return $scope.brands
        },
        filterByMain: function() {
          return $scope.filterByMain
        },
        selectedGear: function() {
          return equipped
        },
        background: function() {
          if(slot=='head') {
            return 'redstripes'
          }
          else if(slot=='clothes') {
            return 'tealstripes'
          }
          else if(slot=='shoes') {
            return 'orangestripes'
          }
          else {
            return 'neonstripes'
          }
        }
      }
    });
    modalInstance.result.then(function(results) {
      $scope.equip(results.selected, slot)
      eval("$scope.loadout." + slot + ".equipped = results.selected")
      if(eval("$scope.loadout." + slot + ".main") == null) {
        eval(("$scope.loadout." + slot + ".main = $scope.getSkillByName('" + results.selected.main + "')"))
      }
      eval("$scope.loadout." + slot + ".equipped = results.selected")
    }, function() {
      $log.info('Gear picker cancelled');
    });
  };
});

angular.module('splatApp').controller('WeaponPickerCtrl', function($scope, $uibModalInstance, getSubByName, getSpecialByName, weaponSets, subs, selectedSet, selectedWeapon) {
  $scope.selectedSet = selectedSet;
  $scope.weaponSets = weaponSets;
  $scope.selectedWeapon = selectedWeapon;

  $scope.switchSet = function() {
    $scope.selectedWeapon = this.availableWeapons()[0];
  }

  $scope.selectWeapon = function(item) {
    $scope.selectedWeapon=item;
  }

  $scope.availableWeapons = function() {
    return this.selectedSet.weapons.filter(filter_available)
  }

  $scope.getSubByName = getSubByName

  $scope.getSubIcon = function(name) {
    return $scope.getSubByName(name).image;
  }

  $scope.getSpecialByName = getSpecialByName

  $scope.getSpecialIcon = function(name) {
    return $scope.getSpecialByName(name).image;
  }

  $scope.ok = function() {
    $uibModalInstance.close({'set' : this.selectedSet, 'weapon': this.selectedWeapon});
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});


angular.module('splatApp').controller('GearPickerCtrl', function($scope, $uibModalInstance, background, slot, set, brands, filterByMain, selectedGear, getSkillByName) {
  $scope.slot = slot
  $scope.set = set
  $scope.filterByMain = filterByMain
  $scope.selectedGear = selectedGear
  $scope.getSkillByName = getSkillByName
  $scope.brands = brands
  $scope.background = background

  if(slot.main != null) $scope.filtered = filterByMain(set,slot.main.name)
  else $scope.filtered = filterByMain(set,null)

  $scope.selectGear = function(item) {
    $scope.selectedGear=item;
  }

  $scope.ok = function() {
    $uibModalInstance.close({selected : this.selectedGear});
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('splatApp').controller('BasicCtrl', function($scope, $uibModalInstance) {
  $scope.ok = function() {
    $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});

