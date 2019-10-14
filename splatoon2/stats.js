function Stat(name, calc, max) {
  this.name = name;
  this.calc = calc;
  this.max = max;
  this.value = 0;
  this.desc = null;
  this.label = { label: null };
  this.calcMod = function(abilityScore) {
    return (0.99 * abilityScore - Math.pow(0.09 * abilityScore,2))
  }
}

//TODO: clean all this up
angular.module('splatApp').stats = function ($scope) {
$scope.stats = {
  //TODO: come up with a better way to convey speed?
  'Swim Speed': new Stat("潜行速度", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Swim Speed Up');
      var baseSpeed = 2.02;
      var coeff = 150;
      if(loadout.weapon.speedLevel == 'Low') {
        baseSpeed = 1.74;
        coeff = 80;
      }
      if(loadout.weapon.speedLevel == 'Middle') {
        baseSpeed = 1.92;
        coeff = 120;
      }
      var speed = baseSpeed * (1 + this.calcMod(abilityScore)/coeff);
      if(loadout.hasAbility('Ninja Squid')) {
        speed = speed * 0.9;
      }
      this.value = speed;
      this.label = "{value} DU/f".format({value: this.value.toFixed(2)})
      this.desc = "DU/f = Distance Unit Per Frame(可移动到1帧的距离单位)";
      return speed.toFixed(2);
    }, 2.43),
    'Run Speed': new Stat("人形移动速度", function(loadout) {
        var abilityScore = loadout.calcAbilityScore('Run Speed Up');
        var baseSpeed = 0.96;
        var coeff = 60;
        if(loadout.weapon.speedLevel == 'High') {
          baseSpeed = 1.04;
          coeff = 78;
        }
        if(loadout.weapon.speedLevel == 'Low') {
          baseSpeed = 0.88;
          coeff = (420/9);
        }
        var speed = baseSpeed * (1 + this.calcMod(abilityScore)/coeff);
        this.value = speed;
        this.label = "{value} DU/f".format({value: this.value.toFixed(2)})
        this.desc = "DU/f = Distance Unit Per Frame(可移动到1帧的距离单位)";
        return speed.toFixed(2);
      }, 1.44),
    'Run Speed (Enemy Ink)': new Stat("人形移动速度 （敌方墨水中）", function(loadout) {
        var abilityScore = loadout.calcAbilityScore('Ink Resistance Up');
        var baseSpeed = 0.32;
        var speed = baseSpeed * (1 + ((0.99 * abilityScore) - Math.pow(0.09 * abilityScore,2)) / 15)
        this.value = speed
        this.label = "{value} DU/f".format({value: this.value.toFixed(2)});
        this.desc = "DU/f = Distance Unit Per Frame(可移动到1帧的距离单位)";
        return this.value.toFixed(1);
      }, 1.44),
    'Run Speed (Firing)': new Stat("人形移动速度 (射击中)", function(loadout) {
        var abilityScore = loadout.calcAbilityScore('Run Speed Up');
        if(loadout.weapon.name.toLowerCase().indexOf('brush') != -1 || loadout.weapon.name.toLowerCase().indexOf('roller') != -1) {
          this.name = "人形移动速度 (Rolling中)"
          var speed = loadout.weapon.baseSpeed;
          this.value = speed;
          this.label = "{value} DU/f".format({value: this.value.toFixed(2)});
          return speed.toFixed(2);
        }
        else {
          this.name = "人形移动速度 (射击中)"
        }
        var weaponRSU = 1 + this.calcMod(abilityScore)/120.452
        var speed = loadout.weapon.baseSpeed * (weaponRSU);
        this.value = speed
        this.label = "{value} DU/f".format({value: this.value.toFixed(2)});
        this.desc = "DU/f = Distance Unit Per Frame(可移动到1帧的距离单位)";
        if(isNaN(this.value)) {
          this.value = 0;
          this.label = "表示不可";
          this.desc = null;
        }
        return this.value.toFixed(1);
      }, 1.44),
    'Ink Recovery Speed (Squid)': new Stat("墨水恢复速度 (乌贼)", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Ink Recovery Up');
      var seconds = 3 * (1 - this.calcMod(abilityScore) / (600 / 7))
      this.desc = "墨水空到满{value}秒".format({value: seconds.toFixed(2)})
      this.value = ((3 / seconds) * 100)
      this.label = "{value}%".format({value: this.value.toFixed(1)})
      return this.value.toFixed(1);
    }, 154),
    'Ink Recovery Speed (Kid)': new Stat("墨水恢复速度 (人形)", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Ink Recovery Up');
      var seconds = 10 * (1 - this.calcMod(abilityScore) / 50)
      this.value = ((10 / seconds) * 100);
      this.desc = "墨水空到满{value}秒".format({value: seconds.toFixed(2)})
      this.label = "{value}%".format({value: this.value.toFixed(1)})
      return this.value.toFixed(1);
    }, 251),
    'Ink Consumption (Main)': new Stat("主武器墨水消耗量", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Ink Saver (Main)');
      var coeff = (200 / 3)
      var reduction =  this.calcMod(abilityScore) / coeff
      var mod = this.calcMod(abilityScore)
      if(loadout.weapon.inkSaver == 'High') {
        reduction = Math.abs(Math.pow(mod,2)/4500 - (7*mod)/300)
      } else {
        reduction = mod / coeff
      }
      var costPerShot = loadout.weapon.inkPerShot * (1 - reduction)
      this.desc = "用光墨水要射击{totalShots}次 ({reduction}% 減少)".format({totalShots: Math.floor(100/costPerShot), reduction: (reduction*100).toFixed(1)})
      this.label = "{unit}/罐{value}% ".format({value: costPerShot.toFixed(1), unit: loadout.weapon.shotUnit})
      this.value = costPerShot;
      if(isNaN(this.value)) {
        this.value = 0;
        this.label = "表示不可";
        this.desc = null;
      }
      return this.value;
    }, 100),
    'Ink Consumption (Sub)': new Stat("副武器墨水消耗量", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Ink Saver (Sub)');
      var coeff = (600 / 7)
      var sub = $scope.getSubByName(loadout.weapon.sub)
      if(sub.inkSaver == 'Low') coeff = 100
      var reduction =  this.calcMod(abilityScore) / coeff
      var costPerSub = sub.cost * (1 - reduction)
      this.value = costPerSub;
      this.localizedDesc = { reduction: reduction.toFixed(1), desc: 'DESC_SUB_COST' };
      this.desc = "{reduction}% 减少".format({reduction: reduction.toFixed(1)})
      this.label = "一次/罐{value}%".format({value: this.value.toFixed(2)})
      return costPerSub;
    }, 100),
    'Special Charge Speed': new Stat("特殊技能槽增长速度", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Special Charge Up');
      var chargeSpeed = (1 + this.calcMod(abilityScore) / 100)
      this.value = chargeSpeed;
      this.desc = "特殊技能需要{value}p".format({value: Math.floor(loadout.weapon.specialCost / chargeSpeed)})
      this.label = "{value}%".format({value: (this.value*100).toFixed(1)});
      return (chargeSpeed * 100).toFixed(1);
    }, 1.3),
    'Special Saved': new Stat("复活后特殊技能槽剩余量 *", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Special Saver');
      var baseKept = 1;
      this.localizedDesc = { desc: null };
      var y = this.calcMod(abilityScore)
      var mod = (1/4500) * Math.pow(y,2) - (7/300)*y + 0.5
      if(loadout.hasAbility('Respawn Punisher')) {
        baseKept -= .225;
        this.desc = "重生惩罚的效果值尚不确定。";
      }
      var kept  = baseKept - mod;
      this.value = kept;
      this.label = "{value}%".format({value: (this.value*100).toFixed(1)});
      return (kept * 100).toFixed(1);
    }, 1),
//TODO: clean this up a bit
    'Special Power': new Stat("特殊技能性能", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Special Power Up');
      var equippedSpecial = $scope.getSpecialByName(loadout.weapon.special)
      var coeff = 0;
      var base = 0;
      var results = 0;
      this.localizedDesc = { desc: null };
      this.name = "特殊技能性能<br>(???)"
      switch(equippedSpecial.name) {
        case 'Suction-Bomb Launcher':
        case 'Burst-Bomb Launcher':
        case 'Curling-Bomb Launcher':
        case 'Autobomb Launcher':
        case 'Splat-Bomb Launcher':
          coeff = 90;
          base = 360;
          this.max = 8.1;
          this.name = "特殊技能性能<br>(持续时间)"
          results = (base * (1 +this.calcMod(abilityScore) / coeff))/60
          this.value = results;
          this.label = "{value}秒".format({value: this.value.toFixed(2)});
          return results.toFixed(2);
          break;
        case 'Ink Armor':
          coeff = 60;
          base = 360;
          this.max = 9;
          this.name = "特殊技能性能<br>(持续时间)"
          results = (base * (1 +this.calcMod(abilityScore) / coeff))/60
          this.value = results;
          this.label = "{value}秒".format({value: this.value.toFixed(2)});
          return results.toFixed(2);
          break;
        case 'Inkjet':
        case 'Ink Storm':
        case 'Sting Ray':
          coeff = 120;
          base = 480;
          this.max = 10;
          this.name = "特殊技能性能<br>(持续时间)"
          results = (base * (1 +this.calcMod(abilityScore) / coeff))/60
          this.value = results;
          this.label = "{value}秒".format({value: this.value.toFixed(2)});
          return results.toFixed(2);
          break;
        case 'Baller':
          coeff = 60;
          base = 400;
          this.max = 600;
          this.name = "特殊技能性能<br>(生存耐久力)"
          results = (base * (1 +this.calcMod(abilityScore) / coeff))
          this.value = results;
          this.label = "{value} HP".format({value: this.value.toFixed(2)});
          return results.toFixed(1);
          break;
        case 'Tenta Missiles':
          coeff = 45;
          base = 4.8;
          this.max = 8;
          this.max = '166'
          this.name = "特殊技能性能<br>(索敌范围扩大)"
          results = (1 +this.calcMod(abilityScore) / coeff)*100
          this.value = results;
          this.label = "{value}%".format({value: this.value.toFixed(1)})
          return results.toFixed(1);
          break;
        case 'Splashdown':
          coeff = 110;
          base = 110;
          this.max = 1.274;
          this.name = "特殊技能性能<br>(爆炸范围扩大)"
          results = (1 +this.calcMod(abilityScore) / coeff)*100
          this.desc = "{value} 距离单位".format({value: (base*results).toFixed(1)})
          this.value = results;
          this.label = "{value}%".format({value: this.value.toFixed(1)})
          return (results*100).toFixed(1);
          break;
        case 'Bubble Blower':
          this.name = "特殊技能性能<br>(泡泡尺寸扩大)";
          this.value = 0;
          this.label = "表示不可";
          break;
      }
      return results;
    }, 100),
//TODO: get effects for all subs
    'Sub Power': new Stat("副武器能力", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Sub Power Up');
      var equippedSub = $scope.getSubByName(loadout.weapon.sub)
      this.name = "副武器能力<br>(炸弹距离)"
      this.value = 0;
      switch(equippedSub.name) {
        case 'Burst Bomb':
        case 'Splat Bomb':
        case 'Suction Bomb':
        case 'Autobomb':
        case 'Point Sensor':
        case 'Toxic Mist':
          var range = (1 + this.calcMod(abilityScore) / 60)
          this.value = range*100;
          this.label = "{value}%".format({value: this.value.toFixed(1)})
          this.name = "副武器能力<br>(炸弹距离)";
          this.max = 150;
          return (range * 100).toFixed(1);
          break;
        case 'Curling Bomb':
          this.name = "副武器能力<br>(速度)";
          this.label = "表示不可";
          break;
        case 'Ink Mine':
          this.name = "副武器能力<br>(效果范围)";
          this.label = "表示不可";
          break;
        case 'Splash Wall':
          this.name = "副武器能力<br>(耐久力)";
          this.label = "表示不可";
          var HP = 800 * (1 + this.calcMod(abilityScore) / (240/7))
          this.value = HP;
          this.label = "{value} HP".format({value: this.value.toFixed(2)});
          this.max = 1500;
          break;
        case 'Sprinkler':
          this.name = "副武器能力<br>(Full-Power Duration)";
          this.label = "表示不可";
          break;
        case 'Squid Beakon':
          this.name = "副武器能力<br>(超级跳跃时间缩短)";
          this.label = "表示不可";
          break;
      }
      return (range * 100).toFixed(1);
    }, 150),
    'Super Jump Time (Squid)': new Stat("超级跳跃时间 (乌贼)", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Quick Super Jump');
      var mod = this.calcMod(abilityScore)
      var totalFrames = (-1/75)*Math.pow(mod,2) - (84/25)*mod + 218
      this.value = (totalFrames) / 60
      this.label = "{value}秒".format({value: this.value.toFixed(2)});
      return ((totalFrames) / 60).toFixed(2);
    }, 3.65),
    'Super Jump Time (Kid)': new Stat("超级跳跃时间 (人形)", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Quick Super Jump');
      var mod = this.calcMod(abilityScore)
      var totalFrames = (-1/75)*Math.pow(mod,2) - (84/25)*mod + 239
      this.value = totalFrames / 60
      this.label = "{value}秒".format({value: this.value.toFixed(2)});
      return (totalFrames / 60).toFixed(2);
    }, 4),
    //TODO: This is WRONG! Need more data on Respawn Punisher!
    'Quick Respawn Time': new Stat("快速复活时间", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Quick Respawn');
      this.name = "快速复活时间";
      this.desc = "无杀且连续被杀情况下的复活时间";
      var death = 30;
      var splatcam = 354;
      var spawn = 120;
      var mod = this.calcMod(abilityScore)/60
      if(loadout.hasAbility('Respawn Punisher')) {
        this.name = "复活持续时间 *";
        this.desc = "复活惩罚的影响不确定。";
        mod *= 0.5;
        splatcam += 74;
      }
      var spawnFrames = death + (splatcam*(1-mod)) + spawn;
      this.value = spawnFrames/60
      this.label = "{value}秒".format({value: this.value.toFixed(2)});
      return this.value.toFixed(2)
    }, 9.6),
    'Tracking Time': new Stat("锁定时间 *", function(loadout) {
      var abilityScore = loadout.calcAbilityScore('Cold-Blooded');
      var trackReduction = this.calcMod(abilityScore) / 40
      this.value = (8 * (1 - trackReduction))
      this.label = "{value}秒".format({value: this.value.toFixed(2)});
      this.desc = "敌方位置传感器/地雷持续时间";
      return (8 * (1 - trackReduction)).toFixed(2);
    }, 8)
  }
  $scope.getStatByName = function(name) {
    return $scope.stats[name]
  }
  $scope.getAdjustedSubSpeDamage = function(sub,loadout) {
  var abilityScore = loadout.calcAbilityScore('Bomb Defense Up');
  var coeff;
  switch(sub.name) {
    case 'Burst Bomb':
      coeff = 75;
      break;
    case 'Splat Bomb':
    case 'Suction Bomb':
    case 'Autobomb':
    case 'Curling Bomb':
    case 'Ink Mine':
      coeff = 60;
      break;
    default:
      coeff = (600/7);
      break;
  }
  var damageReduction = (1 - (0.99 * abilityScore - Math.pow(0.09 * abilityScore,2)) / coeff)
    var results = {}
    for(damageValue in sub.damage) {
      var subDamage = sub.damage[damageValue]
      if(subDamage >= 100) {
        results[damageValue] = subDamage.toFixed(1);
      } else {
        results[damageValue] = (subDamage * damageReduction).toFixed(1);
      }
    }
    return results
  }
  $scope.getAdjustedSpecialCost = function(loadout) {
    var stat = $scope.getStatByName('Special Charge Speed');
    return Math.floor(loadout.weapon.specialCost / (stat.value))
  }
  //beanslee add:
  $scope.getAdjustedinkSaver = function(loadout) {
    var stat = $scope.getStatByName('墨水消耗');
    return (loadout.weapon.inkSaver)     
  }
  $scope.getAdjustedlevel = function(loadout) {
    var stat = $scope.getStatByName('可用等级');
    return (loadout.weapon.level)     
  }
  $scope.getAdjustedspeedLevel = function(loadout) {
    var stat = $scope.getStatByName('射速');
    return (loadout.weapon.speedLevel)     
  }
}
