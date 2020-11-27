angular.module('splatApp').tutorial = function(skillName) {
    var position = null;
    if(screen.width <= 480) { position = "bottom"; } else { position = "right"; }

    var tour = {
        id: "loadout-tutorial",
        showPrevButton: true,
        bubbleWidth: 350,
        i18n: {
            nextBtn: "下一步",
            prevBtn: "后退",
            doneBtn: "完成",
            skipBtn: "跳过",
            closeTooltip: "关闭"
          },
        steps: [
            {
                title: "<u>武器</u>",
                content: "武器选项卡显示以下信息:<br>可通过wiki了解细节<ul>" +
                
                    "<li> <a class='wiki-link' href='https://splatoonwiki.org/wiki/Main_weapon' target='_blank'>武器</a>.</li>" +
                    "<li> <a class='wiki-link' href='https://splatoonwiki.org/wiki/Sub_weapon' target='_blank'>服务器</a>.</li>" +
                    "<li> <a class='wiki-link' href='https://splatoonwiki.org/wiki/Special_weapon' target='_blank'>大招</a> </li></ul>" +
                    "点击 <span class='glyphicon glyphicon-pencil'></span> 图标可更换武器! " +
                    "显示武器详细说明和热门程度." +
                    "<br><br>可在搜素栏输入武器名称、副武器名称、大招名称检索想要的武器!",
                target: "weapon",
                placement: position
            },
            {
                title: "<u>头饰</u>",
                content: "头饰选项卡显示以下信息:<br>可通过wiki了解细节<ul>" +
                    "<li><a class='wiki-link' href='https://splatoonwiki.org/wiki/List_of_headgear_in_Splatoon_2' target='_blank'>头饰</a></li>" +
                    "<li><a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#List_of_abilities_2' target='_blank'>技能</a> </li></ul>" +
                    "点击 <span class='glyphicon glyphicon-pencil'></span> 图标更换头饰! " +
                    "头饰详细信息包括: " +
                    "<ul><li>头饰的<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#Primary_abilities' target='_blank'>主技能</a>.</li>" +
                    "<li>头饰的 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Brand' target='_blank'>品牌</a>.</li></ul>" +
                    "可以按<i>名字</i>, <i>主技能</i>, or <i>品牌</i>检索!",
                    target: "hats",
                placement: position
            },
            {
                title: "<u>头饰技能</u>",
                content: "4个圆型图标代表<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#List_of_abilities_2' target='_blank'>技能.</a>头饰可装配的  <a class='wiki-link' href='https://splatoonwiki.org/wiki/List_of_headgear_in_Splatoon_2' target='_blank'>技能列表参考</a> . " +
                                        "<br><br>第一个是 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#Primary_abilities' target='_blank'>主技能槽</a> , 另外3个为<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#Secondary_abilities' target='_blank'>副技能</a> 槽. " +
                    "1个主技能槽提供1个副技能槽的3倍性能，但服装上的主技能槽是不可更改的!" +
                    "<br><br>一些技能只会出现在主技能槽,这些技能显示在主页技能分割线下方",
                target: "hat-abilities",
                placement: "bottom"
            },
            {
                title: "<u>衣服</u>",
                content: "衣服选项卡显示以下信息:<br>可通过wiki了解细节<ul>" +
                    "<li><a class='wiki-link' href='https://splatoonwiki.org/wiki/List_of_clothing_in_Splatoon_2' target='_blank'>衣服</a>.</li>" +
                    "<li><a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#List_of_abilities_2' target='_blank'>技能</a> .</li></ul>" +
                    "点击 <span class='glyphicon glyphicon-pencil'></span> 图标更换! " +
                    "衣服详细信息包括: " +
                    "<ul><li>衣服的<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#Primary_abilities' target='_blank'>主技能</a>.</li>" +
                    "<li>头饰的 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Brand' target='_blank'>品牌</a>.</li></ul>" +
                    "可以按<i>名字</i>, <i>主技能</i>, or <i>品牌</i>检索!",
                    target: "clothes",
                placement: position
            },
            {
                title: "<u>衣服技能</u>",
                content: "4个圆型图标代表<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#List_of_abilities_2' target='_blank'>技能.</a>衣服可装配的  <a class='wiki-link' href='https://splatoonwiki.org/wiki/List_of_headgear_in_Splatoon_2' target='_blank'>技能列表参见</a> . " +
                    "<br><br>第一个是 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#Primary_abilities' target='_blank'>主技能槽</a> , 另外3个为<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#Secondary_abilities' target='_blank'>副技能</a> 槽. " +
                    "1个主技能槽提供1个副技能槽的3倍性能，但服装上的主技能槽是不可更改的!" +
                    "<br><br>一些技能只会出现在主技能槽,这些技能显示在主页技能分割线下方",
                target: "clothes-abilities",
                placement: "bottom"
            },
            {
                title: "<u>鞋子</u>",
                 content: "鞋子选项卡显示以下信息:<br>可通过wiki了解细节<ul>" +
                    "<li><a class='wiki-link' href='https://splatoonwiki.org/wiki/List_of_shoes_in_Splatoon_2' target='_blank'>鞋子</a>.</li>" +
                    "<li><a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#List_of_abilities_2' target='_blank'>技能</a>.</li></ul>" +
                   "点击 <span class='glyphicon glyphicon-pencil'></span> 图标更换! " +
                    "鞋子详细信息包括: " +
                    "<ul><li>鞋子的<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#Primary_abilities' target='_blank'>主技能</a>.</li>" +
                    "<li>头饰的 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Brand' target='_blank'>品牌</a>.</li></ul>" +
                    "可以按<i>名字</i>, <i>主技能</i>, or <i>品牌</i>检索!",
                    target: "shoes",
                placement: position
            },
            {
                title: "<u>鞋子技能</u>",
                content: "4个圆型图标代表<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#List_of_abilities_2' target='_blank'>技能.</a>鞋子可装配的  <a class='wiki-link' href='https://splatoonwiki.org/wiki/List_of_headgear_in_Splatoon_2' target='_blank'>技能列表参见</a> . " +
                    "<br><br>第一个是 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#Primary_abilities' target='_blank'>主技能槽</a> , 另外3个为<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ability#Secondary_abilities' target='_blank'>副技能</a> 槽. " +
                    "1个主技能槽提供1个副技能槽的3倍性能，但服装上的主技能槽是不可更改的!" +
                    "<br><br>一些技能只会出现在主技能槽,这些技能显示在主页技能分割线下方",
                target: "shoes-abilities",
                placement: "bottom"
            },
            {
                title: "<u>主省</u>",
                content: "<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ink_Saver_(Main)' target='_blank'></a> 减轻主武器的墨水消耗 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Main_weapon' target='_blank'></a>. " 
                   ,
                target: "icon:Ink Saver (Main)",
                placement: "top"         
            },
            {
                title: "<u>副省</u>",
                content: " <a class='wiki-link' href='https://splatoonwiki.org/wiki/Ink_Saver_(Sub)' target='_blank'></a> 减轻副武器的墨水消耗 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Sub_weapon' target='_blank'></a>. " +
                    "",
                target: "icon:Ink Saver (Sub)",
                placement: "top"         
            },
            {
                title: "<u>墨水回复速度增加</u>",
                content: " <a class='wiki-link' href='https://splatoonwiki.org/wiki/Ink_Recovery_Up' target='_blank'></a>增加在人形状态下的墨水回复速度<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ink_Tank' target='_blank'></a>. " +
                    "注意：处于射击状态该技能无效." ,
                target: "icon:Ink Recovery Up",
                placement: "top"         
            },
            {
                title: "<u>走速增强</u>",
                content: "<a class='wiki-link' href='https://splatoonwiki.org/wiki/Run_Speed_Up' target='_blank'></a>提升人形移动或射击时的移动速度." +
                    "对于滚刷或笔刷的甩动速度无效",
                target: "icon:Run Speed Up",
                placement: "top"         
            },
            {
                title: "<u>游速增强</u>",
                content: "<a class='wiki-link' href='https://splatoonwiki.org/wiki/Swim_Speed_Up' target='_blank'></a>提升游动速度." +
                    "使用隐游会降低游动速度" ,
                target: "icon:Swim Speed Up",
                placement: "top"
            },
            {
                title: "<u>超级跳时间缩短</u>",
                content: "The <a class='wiki-link' href='https://splatoonwiki.org/wiki/Quick_Super_Jump' target='_blank'></a> 增加超级跳的速度<a class='wiki-link' href='https://splatoonwiki.org/wiki/Super_Jump' target='_blank'> </a> . " ,
                target: "icon:Quick Super Jump",
                placement: "top"
            },
            {
                title: "<u>敌方墨水影响降低</u>",
                content: "<a class='wiki-link' href='https://splatoonwiki.org/wiki/Ink_Resistance_Up' target='_blank'></a> " +
                    "减少处于敌方墨水区域时的损伤,增加走速, 甚至暂时免疫敌方墨水的影响." ,
                target: "icon:Ink Resistance Up",
                placement: "top"
            },
            {
                title: "<u>爆风防御增强</u>",
                content: "<a class='wiki-link' href='https://splatoonwiki.org/wiki/Bomb_Defense_Up_DX' target='_blank'></a> <a class='wiki-link' href='https://splatoonwiki.org/wiki/Bomb_Defense_Up' target='_blank'> </a> and <a class='wiki-link' href='https://splatoonwiki.org/wiki/Cold-Blooded' target='_blank'></a> 增强对敌方副武器或nice弹等爆炸攻击产生的爆风伤害的防御力." ,
                target: "icon:Bomb Defense Up DX",
                placement: "top"
            },
            {
                title: "<u>主强</u>",
                content: " <a class='wiki-link' href='https://splatoonwiki.org/wiki/Main_Power_Up' target='_blank'></a> 增强主武器的攻击力 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Main_weapon' target='_blank'></a>.每类武器的影响指标均不相同." ,
                target: "icon:Main Power Up",
                placement: "top"
            },
            {
                title: "<u>快速复活</u>",
                content: "<a class='wiki-link' href='https://splatoonwiki.org/wiki/Quick_Respawn' target='_blank'></a> 只有在没有击杀敌人且被击杀时才会激活该技能." ,
                target: "icon:Quick Respawn",
                placement: "top"
            },
            {
                title: "<u>大招槽增速</u>",
                content: " <a class='wiki-link' href='https://splatoonwiki.org/wiki/Special_Charge_Up' target='_blank'></a> 减少大招槽积攒的点数（通过涂地获得） <a class='wiki-link' href='https://splatoonwiki.org/wiki/Special_gauge' target='_blank'></a>." 
                    ,
                target: "icon:Special Charge Up",
                placement: "top"
            },
            {
                title: "<u>大招槽节省</u>",
                content: " <a class='wiki-link' href='https://splatoonwiki.org/wiki/Special_Saver' target='_blank'></a>减少每次被击杀时大招槽的损失量 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Special_gauge' target='_blank'></a> ." ,
                target: "icon:Special Saver",
                placement: "top"
            },
            {
                title: "<u>大招增强</u>",
                content: " <a class='wiki-link' href='https://splatoonwiki.org/wiki/Special_Power_Up' target='_blank'></a> 增强大招的性能 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Special_weapon' target='_blank'></a> " ,
                 
                target: "icon:Special Power Up",
                placement: "top"
            },
            {
                title: "<u>副武器增强</u>",
                content: " <a class='wiki-link' href='https://splatoonwiki.org/wiki/Sub_Power_Up' target='_blank'></a> 增强副武器的性能 <a class='wiki-link' href='https://splatoonwiki.org/wiki/Sub_weapon' target='_blank'></a>. ",
                
                target: "icon:Sub Power Up",
                placement: "top"
            },
            {
                title: "<u>其他</u>",
                content: "其他尚需补充说明的(待完成). " 
                    ,
                target: "version",
                placement: "bottom"
            },
        ]
    };

    var skillNameToIndex = {
        "Ink Saver (Main)": 7,
        "Ink Saver (Sub)": 8,
        "Ink Recovery Up": 9,
        "Run Speed Up": 10,
        "Swim Speed Up": 11,
        "Quick Super Jump": 12,
        "Ink Resistance Up": 13,
        "Bomb Defense Up DX": 14,
        "Main Power Up": 15,
        "Quick Respawn": 16,
        "Special Charge Up": 17,
        "Special Saver": 18,
        "Special Power Up": 19,
        "Sub Power Up": 20
    };

    if(skillNameToIndex[skillName]) {
        hopscotch.startTour(tour, skillNameToIndex[skillName]);
    }
    else {
        hopscotch.startTour(tour);
    }
};
  
