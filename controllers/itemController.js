var Item = require('../models/item');
const async = require('async');
const {body,validationResult} = require('express-validator');
const item = require('../models/item');

// Display menu
exports.menu = function(req, res, next) {
    async.parallel({
        alleykat: function(callback) {Item.findOne({name: 'Alleykat Aprikat Apricot Ale'}).exec(callback)},
        analog: function(callback) {Item.findOne({name: 'Analog Hive Bomber Honey Wheat'}).exec(callback)},
        annexgood: function(callback) {Item.findOne({name: 'Annex Ale Project Good Authority Golden Ale'}).exec(callback)},
        annexforce: function(callback) {Item.findOne({name: 'Annex Force Majeure NE IPA'}).exec(callback)},
        apex: function(callback) {Item.findOne({name: 'Apex Predator Double IPA'}).exec(callback)},
        blindman: function(callback) {Item.findOne({name: 'Blindman Triphammer Porter'}).exec(callback)},
        b_hefe: function(callback) {Item.findOne({name: 'Brauerei Fahr AB Hefeweizen'}).exec(callback)},
        b_copper: function(callback) {Item.findOne({name: 'Brauerei Fahr AB Copper'}).exec(callback)},
        ca_orangeCran: function(callback) {Item.findOne({name: 'Collective Arts Blood Orange and Cranberry Cider'}).exec(callback)},
        ca_app: function(callback) {Item.findOne({name: 'Collective Arts Apple Cider'}).exec(callback)},
        ca_appCherry: function(callback) {Item.findOne({name: 'Collective Arts Apple & Cherry Cider'}).exec(callback)},
        ca_orangeCran: function(callback) {Item.findOne({name: 'Collective Arts Blood Orange and Cranberry Cider'}).exec(callback)},
        prosthetic: function(callback) {Item.findOne({name: 'Revel Cider Prosthetic Conscience'}).exec(callback)},
        sonata: function(callback) {Item.findOne({name: 'Revel Sonata Cherry Cider'}).exec(callback)},
        wabamo: function(callback) {Item.findOne({name: 'Sourwood Wabamo Dry Hopped Cider'}).exec(callback)},
        plumbum: function(callback) {Item.findOne({name: 'Sourwood Plumbum'}).exec(callback)},
        semitone: function(callback) {Item.findOne({name: 'Sourwood Semitone'}).exec(callback)},
        ddc: function(callback) {Item.findOne({name: 'DDC Aphrodisiaque Strong Stout'}).exec(callback)},
        mongoz: function(callback) {Item.findOne({name: 'Mongozo GF Pilsner'}).exec(callback)},
        berserk: function(callback) {Item.findOne({name: 'New Level Berserker Blonde'}).exec(callback)},
        seach: function(callback) {Item.findOne({name: 'Sea Change Prairie Fairy Blackberry Wheat'}).exec(callback)},
        idleHands: function(callback) {Item.findOne({name: 'Annex Idle Hands Italian Pilsner'}).exec(callback)},
        sycPont: function(callback) {Item.findOne({name: 'SYC Pontification Italian Pilsner'}).exec(callback)},
        dandyt2g: function(callback) {Item.findOne({name: 'The Dandy Brewing Company T2G IPA'}).exec(callback)},
        town: function(callback) {Item.findOne({name: 'Townsquare Forged Amber Rye Ale'}).exec(callback)},
        troubledMonk: function(callback) {Item.findOne({name: 'Troubled Monk Open Road American Brown Ale'}).exec(callback)},
        achel: function(callback) {Item.findOne({name: 'Achel Blond'}).exec(callback)},
        chimay_r: function(callback) {Item.findOne({name: 'Chimay Red'}).exec(callback)},
        chimay_w: function(callback) {Item.findOne({name: 'Chimay White'}).exec(callback)},
        chimay_b: function(callback) {Item.findOne({name: 'Chimay Blue'}).exec(callback)},
        dupont: function(callback) {Item.findOne({name: 'Dupont Avec Les Bons Voeux'}).exec(callback)},
        gouden: function(callback) {Item.findOne({name: 'Gouden Carolus Classic'}).exec(callback)},
        kwak: function(callback) {Item.findOne({name: 'Kwak'}).exec(callback)},
        guillot: function(callback) {Item.findOne({name: 'La Guillotine'}).exec(callback)},
        lindem: function(callback) {Item.findOne({name: 'Lindemans Oude Gueuze Cuvée René Lambic'}).exec(callback)},
        orval: function(callback) {Item.findOne({name: 'Orval Trappist Ale'}).exec(callback)},
        oudKriek: function(callback) {Item.findOne({name: 'Oud Beersel Kriek'}).exec(callback)},
        roch6: function(callback) {Item.findOne({name: 'Rochefort 6'}).exec(callback)},
        roch8: function(callback) {Item.findOne({name: 'Rochefort 8'}).exec(callback)},
        tripelKarm: function(callback) {Item.findOne({name: 'Tripel Karmeliet Golden Belgian'}).exec(callback)},
        westdubb: function(callback) {Item.findOne({name: 'Westmalle Dubbel'}).exec(callback)},
        westtrip: function(callback) {Item.findOne({name: 'Westmalle Tripel'}).exec(callback)},
        draft1: function(callback) {Item.findOne({name: 'Feature Draft #1'}).exec(callback)},
        draft2: function(callback) {Item.findOne({name: 'Feature Draft #2'}).exec(callback)},
        draft3: function(callback) {Item.findOne({name: 'Feature Draft #3'}).exec(callback)},
        draft4: function(callback) {Item.findOne({name: 'Feature Draft #4'}).exec(callback)},
        draft5: function(callback) {Item.findOne({name: 'Feature Draft #5'}).exec(callback)},
        draft6: function(callback) {Item.findOne({name: 'Feature Draft #6'}).exec(callback)},
        draft7: function(callback) {Item.findOne({name: 'Feature Draft #7'}).exec(callback)},
        draft8: function(callback) {Item.findOne({name: 'Feature Draft #8'}).exec(callback)},
        draft9: function(callback) {Item.findOne({name: 'Feature Draft #9'}).exec(callback)},
        draft10: function(callback) {Item.findOne({name: 'Feature Draft #10'}).exec(callback)},
        bott1: function(callback) {Item.findOne({name: 'Feature Bottle/Can #1'}).exec(callback)},
        bott2: function(callback) {Item.findOne({name: 'Feature Bottle/Can #2'}).exec(callback)},
        bott3: function(callback) {Item.findOne({name: 'Feature Bottle/Can #3'}).exec(callback)},
        bott4: function(callback) {Item.findOne({name: 'Feature Bottle/Can #4'}).exec(callback)},
        bott5: function(callback) {Item.findOne({name: 'Feature Bottle/Can #5'}).exec(callback)},
        bott6: function(callback) {Item.findOne({name: 'Feature Bottle/Can #6'}).exec(callback)},
        bott7: function(callback) {Item.findOne({name: 'Feature Bottle/Can #7'}).exec(callback)},
        bott8: function(callback) {Item.findOne({name: 'Feature Bottle/Can #8'}).exec(callback)},
        bott9: function(callback) {Item.findOne({name: 'Feature Bottle/Can #9'}).exec(callback)},
        bott10: function(callback) {Item.findOne({name: 'Feature Bottle/Can #10'}).exec(callback)},
        merit16: function(callback) {Item.findOne({name: "Clos du Soleil Célestiale . Meritage '16"}).exec(callback)},
        merit18: function(callback) {Item.findOne({name: "Clos du Soleil Capella . White Meritage '18"}).exec(callback)},
        zinfand: function(callback) {Item.findOne({name: "Lapis Luna . Zinfandel '19"}).exec(callback)},
        lapisPinotNoir: function(callback) {Item.findOne({name: "Lapis Luna . Pinot Noir '19"}).exec(callback)},
        chard: function(callback) {Item.findOne({name: "Lapis Luna . Chardonnay '18"}).exec(callback)},
        gewurtz: function(callback) {Item.findOne({name: "Wild Goose . Gewürtztraminer '18"}).exec(callback)},
        gamay: function(callback) {Item.findOne({name: "Rosewood . Night Moves . Gamay '17"}).exec(callback)},
        laugh: function(callback) {Item.findOne({name: "Laughing Stock . Portfolio Red '18"}).exec(callback)},
        ries: function(callback) {Item.findOne({name: "Pearl Morissette Cuvée Sputnik . Riesling '17"}).exec(callback)},
        mionet: function(callback) {Item.findOne({name: "Mionetto Prosecco DOC Treviso Brut"}).exec(callback)},
        frico: function(callback) {Item.findOne({name: "Frico Lambrusco Sparkling Red"}).exec(callback)},
        benjam: function(callback) {Item.findOne({name: "Benjamin Bridge Pétillant Naturel Sparkling"}).exec(callback)},
        rich: function(callback) {Item.findOne({name: "Richvale Pool Party Rosé"}).exec(callback)},
        goose: function(callback) {Item.findOne({name: "Vodka: Grey Goose"}).exec(callback)},
        ciroc: function(callback) {Item.findOne({name: "Vodka: CIROC"}).exec(callback)},
        tempo: function(callback) {Item.findOne({name: "Gin: Tempo"}).exec(callback)},
        ophir: function(callback) {Item.findOne({name: "Gin: Ophir"}).exec(callback)},
        cucumb: function(callback) {Item.findOne({name: "Gin: Long Table Cucumber"}).exec(callback)},
        arette: function(callback) {Item.findOne({name: "Tequila: Arette Blanco"}).exec(callback)},
        espol: function(callback) {Item.findOne({name: "Tequila: Espolòn Reposado"}).exec(callback)},
        mezcal: function(callback) {Item.findOne({name: "Tequila: Mezcal Pelotón"}).exec(callback)},
        glenIrish: function(callback) {Item.findOne({name: "Whiskey: Glendalough Irish"}).exec(callback)},
        forty: function(callback) {Item.findOne({name: "Whiskey: Forty Creek Copper Pot"}).exec(callback)},
        nikka: function(callback) {Item.findOne({name: "Whiskey: Nikka Coffee Still Malt (Japan)"}).exec(callback)},
        lot40: function(callback) {Item.findOne({name: "Whiskey: Lot 40 Rye"}).exec(callback)},
        adelph: function(callback) {Item.findOne({name: "Scotch: Adelphi Private Stock Blend"}).exec(callback)},
        glengoyn: function(callback) {Item.findOne({name: "Scotch: Glengoyne 12"}).exec(callback)},
        caol: function(callback) {Item.findOne({name: "Scotch: Caol Ila 12"}).exec(callback)},
        laph: function(callback) {Item.findOne({name: "Scotch: Laphroaig Select"}).exec(callback)},
        glenroth: function(callback) {Item.findOne({name: "Scotch: Glenrothes 12"}).exec(callback)},
        b1792: function(callback) {Item.findOne({name: "Bourbon: 1792"}).exec(callback)},
        buffal: function(callback) {Item.findOne({name: "Bourbon: Buffalo Trace"}).exec(callback)},
        bulleit: function(callback) {Item.findOne({name: "Bourbon: Bulleit"}).exec(callback)},
        knob: function(callback) {Item.findOne({name: "Bourbon: Knob Creek"}).exec(callback)},
        roses: function(callback) {Item.findOne({name: "Bourbon: Four Roses"}).exec(callback)},
        dad: function(callback) {Item.findOne({name: "Bourbon: Old Grand Dad"}).exec(callback)},
        sazerac: function(callback) {Item.findOne({name: "Bourbon: Sazerac"}).exec(callback)},
        dorado3: function(callback) {Item.findOne({name: "Rum: El Dorado 3 yr"}).exec(callback)},
        dorado12: function(callback) {Item.findOne({name: "Rum: El Dorado 12 yr"}).exec(callback)},
        blackpool: function(callback) {Item.findOne({name: "Rum: Blackpool Spiced"}).exec(callback)},
        boulev: function(callback) {Item.findOne({name: "Boulevardier"}).exec(callback)},
        grandmoth: function(callback) {Item.findOne({name: "Grandmother's Purse"}).exec(callback)},
        horse: function(callback) {Item.findOne({name: "Horse With No Mane"}).exec(callback)},
        penicill: function(callback) {Item.findOne({name: "Penicillin"}).exec(callback)},
        tiPunch: function(callback) {Item.findOne({name: "Ti' Punch!"}).exec(callback)},
        disco: function(callback) {Item.findOne({name: "Discotheque"}).exec(callback)},
        peachPit: function(callback) {Item.findOne({name: "Peach Pit"}).exec(callback)},
        coldBrewSpritz: function(callback) {Item.findOne({name: "Cold Brew Spritz"}).exec(callback)},
        mimosa: function(callback) {Item.findOne({name: "Mimosa"}).exec(callback)},
        sangria_r: function(callback) {Item.findOne({name: "Sangria: Red"}).exec(callback)},
        sangria_w: function(callback) {Item.findOne({name: "Sangria: White"}).exec(callback)},
        caesar: function(callback) {Item.findOne({name: "Caesar"}).exec(callback)},
        mojito: function(callback) {Item.findOne({name: "Mojito"}).exec(callback)},
        oldfashioned: function(callback) {Item.findOne({name: "Old-Fashioned"}).exec(callback)},
        b52: function(callback) {Item.findOne({name: "B52"}).exec(callback)},
        after8: function(callback) {Item.findOne({name: "After 8"}).exec(callback)},
        monte: function(callback) {Item.findOne({name: "Monte Cristo"}).exec(callback)},
        spanish: function(callback) {Item.findOne({name: "Spanish"}).exec(callback)},
        irish: function(callback) {Item.findOne({name: "Irish"}).exec(callback)},
        tiramisu: function(callback) {Item.findOne({name: "Tiramisu"}).exec(callback)},
        chai: function(callback) {Item.findOne({name: "House-Made Chai Latte"}).exec(callback)},
        hotchoc: function(callback) {Item.findOne({name: "Hot Chocolate"}).exec(callback)},
        london: function(callback) {Item.findOne({name: "London Fog"}).exec(callback)},
        coldBrew: function(callback) {Item.findOne({name: "Cold Brew"}).exec(callback)},
        cola: function(callback) {Item.findOne({name: "Pop: Coca-Cola"}).exec(callback)},
        dietcoke: function(callback) {Item.findOne({name: "Pop: Diet Coke"}).exec(callback)},
        sprite: function(callback) {Item.findOne({name: "Pop: Sprite"}).exec(callback)},
        iceTea: function(callback) {Item.findOne({name: "Pop: Ice Tea"}).exec(callback)},
        gingerale: function(callback) {Item.findOne({name: "Pop: Ginger Ale"}).exec(callback)},
        cranSoda: function(callback) {Item.findOne({name: "Pop: Cran-Soda"}).exec(callback)},
        pellBO: function(callback) {Item.findOne({name: "S.Pellegrino: Blood Orange"}).exec(callback)},
        pellClem: function(callback) {Item.findOne({name: "S.Pellegrino: Clementine"}).exec(callback)},
        pellLem: function(callback) {Item.findOne({name: "S.Pellegrino: Lemon"}).exec(callback)},
        pellO: function(callback) {Item.findOne({name: "S.Pellegrino: Orange"}).exec(callback)},
        pell250: function(callback) {Item.findOne({name: "S.Pellegrino Sparkling Mineral Water: 250 mL"}).exec(callback)},
        pell750: function(callback) {Item.findOne({name: "S.Pellegrino Sparkling Mineral Water: 750 mL"}).exec(callback)},
        annexRoot: function(callback) {Item.findOne({name: "Annex: Root Beer"}).exec(callback)},
        annexSask: function(callback) {Item.findOne({name: "Annex: Saskatoon Lemonade"}).exec(callback)},
        NLPain: function(callback) {Item.findOne({name: "New Level Painapple Punch Craft Soda"}).exec(callback)},
        jamaic: function(callback) {Item.findOne({name: "Royal Jamaican Ginger Beer"}).exec(callback)},
        freibier: function(callback) {Item.findOne({name: "Stiegl Freibier Non-Alcoholic"}).exec(callback)},
        tonic: function(callback) {Item.findOne({name: "Fancy Tonic"}).exec(callback)},
        feverLemonade: function(callback) {Item.findOne({name: "Fever-Tree Sicilian Lemonade"}).exec(callback)},
        feverGinger: function(callback) {Item.findOne({name: "Fever-Tree Ginger Beer"}).exec(callback)},
        cinnaBun: function(callback) {Item.findOne({name: "Cinnamon Bun"}).exec(callback)},
        breakSand: function(callback) {Item.findOne({name: "Breakfast Sandwich"}).exec(callback)},
        burrit: function(callback) {Item.findOne({name: "Burrito"}).exec(callback)},
        omelett: function(callback) {Item.findOne({name: "Omelette"}).exec(callback)},
        benny: function(callback) {Item.findOne({name: "Sugarbowl Benny"}).exec(callback)},
        huevos: function(callback) {Item.findOne({name: "Huevos Rancheros"}).exec(callback)},
        chickWaff: function(callback) {Item.findOne({name: "Chicken And Waffles"}).exec(callback)},
        veganSaus: function(callback) {Item.findOne({name: "Vegan Sausage And Tofu Scramble"}).exec(callback)},
        french: function(callback) {Item.findOne({name: "French Toast"}).exec(callback)},
        griddle: function(callback) {Item.findOne({name: "The Sugar Griddle"}).exec(callback)},
        waffleSandwich: function(callback) {Item.findOne({name: "Chicken Waffle Sandwich"}).exec(callback)},
        chickenSalad: function(callback) {Item.findOne({name: "Chicken Salad Sandwich"}).exec(callback)},
        heady: function(callback) {Item.findOne({name: "The Heady Vegetarian Sandwich"}).exec(callback)},
        popcorn: function(callback) {Item.findOne({name: 'Smoked Paprika Popcorn'}).exec(callback)},
        almond: function(callback) {Item.findOne({name: 'Almond Spread With Pita Bread'}).exec(callback)},
        pommes: function(callback) {Item.findOne({name: 'Pommes Frites'}).exec(callback)},
        yam: function(callback) {Item.findOne({name: 'Yam Fries'}).exec(callback)},
        soup: function(callback) {Item.findOne({name: 'Soup Of The Day'}).exec(callback)},
        brunch_feature: function(callback) {Item.findOne({name: 'Brunch Feature'}).exec(callback)},
        lunch_feature_1: function(callback) {Item.findOne({name: 'Lunch Feature #1'}).exec(callback)},
        lunch_feature_2: function(callback) {Item.findOne({name: 'Lunch Feature #2'}).exec(callback)},
        dinner_feature_1: function(callback) {Item.findOne({name: 'Dinner Feature #1'}).exec(callback)},
        dinner_feature_2: function(callback) {Item.findOne({name: 'Dinner Feature #2'}).exec(callback)},
        caesar_salad: function(callback) {Item.findOne({name: 'Caesar Salad'}).exec(callback)},
        bazmac: function(callback) {Item.findOne({name: 'Baz Mac'}).exec(callback)},
        lamb: function(callback) {Item.findOne({name: 'Lamb Burger'}).exec(callback)},
        beef: function(callback) {Item.findOne({name: 'Beef Burger'}).exec(callback)},
        veggie: function(callback) {Item.findOne({name: 'Veggie Burger'}).exec(callback)},
        pork: function(callback) {Item.findOne({name: 'Pulled Pork Sandwich'}).exec(callback)},
        jerk: function(callback) {Item.findOne({name: 'Jerk Chicken Sandwich'}).exec(callback)},
        mac: function(callback) {Item.findOne({name: "Mac' And Cheese"}).exec(callback)},
        curry: function(callback) {Item.findOne({name: "Chicken Curry Stew"}).exec(callback)},
        bison: function(callback) {Item.findOne({name: "Bison Chili"}).exec(callback)},
        dessert_feature: function(callback) {Item.findOne({name: 'Dessert Feature'}).exec(callback)},
        cheesecake: function(callback) {Item.findOne({name: "Cheesecake Of The Day"}).exec(callback)},
        banana: function(callback) {Item.findOne({name: "Banana Cream Pie"}).exec(callback)}
    }, function (err, items) {
        if (err) {return next(err);} // Error in API usage
        // Success, so render
        res.render('menu', {
            alleykat: items.alleykat,
            analog: items.analog,
            annexgood: items.annexgood,
            annexforce: items.annexforce,
            apex: items.apex,
            blindman: items.blindman,
            b_hefe: items.b_hefe,
            b_copper: items.b_copper,
            ca_app: items.ca_app,
            ca_appCherry: items.ca_appCherry,
            ca_orangeCran: items.ca_orangeCran,
            prosthetic: items.prosthetic,
            sonata: items.sonata,
            wabamo: items.wabamo,
            plumbum: items.plumbum,
            semitone: items.semitone,
            ddc: items.ddc,
            mongoz: items.mongoz,
            berserk: items.berserk,
            seach: items.seach,
            idleHands: items.idleHands,
            sycPont: items.sycPont,
            dandyt2g: items.dandyt2g,
            town: items.town,
            troubledMonk: items.troubledMonk,
            achel: items.achel,
            chimay_r: items.chimay_r,
            chimay_w: items.chimay_w,
            chimay_b: items.chimay_b,
            dupont: items.dupont,
            gouden: items.gouden,
            kwak: items.kwak,
            guillot: items.guillot,
            lindem: items.lindem,
            orval: items.orval,
            oudKriek: items.oudKriek,
            roch6: items.roch6,
            roch8: items.roch8,
            tripelKarm: items.tripelKarm,
            westdubb: items.westdubb,
            westtrip: items.westtrip,
            draft1: items.draft1,
            draft2: items.draft2,
            draft3: items.draft3,
            draft4: items.draft4,
            draft5: items.draft5,
            draft6: items.draft6,
            draft7: items.draft7,
            draft8: items.draft8,
            draft9: items.draft9,
            draft10: items.draft10,
            bott1: items.bott1,
            bott2: items.bott2,
            bott3: items.bott3,
            bott4: items.bott4,
            bott5: items.bott5,
            bott6: items.bott6,
            bott7: items.bott7,
            bott8: items.bott8,
            bott9: items.bott9,
            bott10: items.bott10,
            merit16: items.merit16,
            merit18: items.merit18,
            zinfand: items.zinfand,
            lapisPinotNoir: items.lapisPinotNoir,
            chard: items.chard,
            gewurtz: items.gewurtz,
            gamay: items.gamay,
            laugh: items.laugh,
            ries: items.ries,
            mionet: items.mionet,
            frico: items.frico,
            benjam: items.benjam,
            rich: items.rich,
            goose: items.goose,
            ciroc: items.ciroc,
            tempo: items.tempo,
            ophir: items.ophir,
            cucumb: items.cucumb,
            arette: items.arette,
            espol: items.espol,
            mezcal: items.mezcal,
            glenIrish: items.glenIrish,
            forty: items.forty,
            nikka: items.nikka,
            lot40: items.lot40,
            adelph: items.adelph,
            glengoyn: items.glengoyn,
            caol: items.caol,
            laph: items.laph,
            glenroth: items.glenroth,
            b1792: items.b1792,
            buffal: items.buffal,
            bulleit: items.bulleit,
            knob: items.knob,
            roses: items.roses,
            dad: items.dad,
            sazerac: items.sazerac,
            dorado3: items.dorado3,
            dorado12: items.dorado12,
            blackpool: items.blackpool,
            boulev: items.boulev,
            grandmoth: items.grandmoth,
            horse: items.horse,
            penicill: items.penicill,
            tiPunch: items.tiPunch,
            disco: items.disco,
            peachPit: items.peachPit,
            coldBrewSpritz: items.coldBrewSpritz,
            mimosa: items.mimosa,
            sangria_r: items.sangria_r,
            sangria_w: items.sangria_w,
            caesar: items.caesar,
            mojito: items.mojito,
            oldfashioned: items.oldfashioned,
            b52: items.b52,
            after8: items.after8,
            monte: items.monte,
            spanish: items.spanish,
            irish: items.irish,
            tiramisu: items.tiramisu,
            chai: items.chai,
            hotchoc: items.hotchoc,
            london: items.london,
            coldBrew: items.coldBrew,
            cola: items.cola,
            dietcoke: items.dietcoke,
            sprite: items.sprite,
            iceTea: items.iceTea,
            gingerale: items.gingerale,
            cranSoda: items.cranSoda,
            pellBO: items.pellBO,
            pellClem: items.pellClem,
            pellLem: items.pellLem,
            pellO: items.pellO,
            pell250: items.pell250,
            pell750: items.pell750,
            annexRoot: items.annexRoot,
            annexSask: items.annexSask,
            NLPain: items.NLPain,
            jamaic: items.jamaic,
            freibier: items.freibier,
            tonic: items.tonic,
            feverLemonade: items.feverLemonade,
            feverGinger: items.feverGinger,
            cinnaBun: items.cinnaBun,
            breakSand: items.breakSand,
            burrit: items.burrit,
            omelett: items.omelett,
            benny: items.benny,
            huevos: items.huevos,
            chickWaff: items.chickWaff,
            veganSaus: items.veganSaus,
            french: items.french,
            griddle: items.griddle,
            waffleSandwich: items.waffleSandwich,
            chickenSalad: items.chickenSalad,
            heady: items.heady,
            popcorn: items.popcorn,
            almond: items.almond,
            pommes: items.pommes,
            yam: items.yam,
            soup: items.soup,
            brunch_feature: items.brunch_feature,
            lunch_feature_1: items.lunch_feature_1,
            lunch_feature_2: items.lunch_feature_2,
            dinner_feature_1: items.dinner_feature_1,
            dinner_feature_2: items.dinner_feature_2,
            caesar_salad: items.caesar_salad,
            bazmac: items.bazmac,
            lamb: items.lamb,
            beef: items.beef,
            veggie: items.veggie,
            pork: items.pork,
            jerk: items.jerk,
            mac: items.mac,
            curry: items.curry,
            bison: items.bison,
            dessert_feature: items.dessert_feature,
            cheesecake: items.cheesecake,
            banana: items.banana
        });
    });
};

// Display update form on GET
exports.item_update_get = function(req, res) {
    res.render('menu-updater/update', {title: 'Menu Updater'});
};

// Handle update on POST
exports.item_update_post = function(req, res, next) {

    Item.findOne({name: req.body.name}, function(err, item) {
        if (err) { return next(err);}
        if (item == null) { // no results
            var err = new Error('Menu item not found.');
            err.status = 404;
            return next(err);
        }
        // Success
        res.redirect(item.url);
    });
};

// Handle item details on GET
exports.item_details_get = function(req, res, next) {
    // Get item for form
    Item.findById(req.params.id, function(err, item) {
        if (err) {return next(err);}
        if (item == null) { // No results
            var err = new Error('Menu Item not found.')
            err.status = 404;
            return next(err);
        }
        //
        res.render('menu-updater/item_details', {title: "Update '" + item.name + "'", item:item});
    });
};

// Handle item details on POST
exports.item_details_post = [
    // Convert diet to an array
    (req, res, next) => {
        if(!(req.body.diet instanceof Array)){
            if(typeof req.body.diet === 'undefined')
            req.body.diet = [];
            else
            req.body.diet = new Array(req.body.diet);
        }
        next();
    },

    // Validate and sanitize fields
    body('name_feature').trim(),
    body('availability').escape(),
    body('price_reg').trim(),
    body('price_large').trim(),
    body('description').trim(),
    body('diet.*').escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        
        // Extract the validation errors from a request
        const errors = validationResult(req);

        // Create a Item object with escaped/trimmed data and old id
        var item = new Item (
            {
                name_feature: req.body.name_feature,
                price_reg: req.body.price_reg,
                price_large: req.body.price_large,
                description: req.body.description,
                diet: req.body.diet,
                availability: req.body.availability,
                _id: req.params.id, // This is required, or a new ID will be assigned!
            }
        );
        
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('menu-updater/item_details', {title: "Update '" + item.name + "'", item: item, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Item.findByIdAndUpdate(req.params.id, item, {new:true}, function (err, item) {
                if (err) { return next(err); }
                // Successful
                // Recreate 'Breakfast' subcategory for dynamic menu items
                Item.updateMany({name: {$in: ["Brunch Feature", "Breakfast Sandwich", "Burrito", "Omelette"]}}, {subcategory: "Breakfast"}, {new: true}, function (err, item) {
                    if (err) {return next(err); }
                });
                // redirect to menu update page
                res.redirect('/menu/item/' + item._id + '/confirmed');
            });
        }   
    }
];

// Confirmation page GET
exports.update_confirmation_get = function(req, res) {
    res.render('menu-updater/update_confirmation', {title: 'Update Was Successful!'})
}

// Make all food available GET
exports.all_available_get = function(req, res) {
    res.render('menu-updater/all_available');
}

// Make all food available POST
exports.all_available_post = function(req, res) {
    if (req.body.all_available == 'true') {

        Item.updateMany({category: 'Food', name: {$nin: ["Lunch Feature #1", "Lunch Feature #2", "Dinner Feature #1", "Dinner Feature #2"]}}, {availability: ''}, {new: true},
            function (err, results) {
                if (err) {return next(err);}
                else {
                    res.redirect('/menu/update');
                }
            }
        );
    }
};

// Make breakfast unavailable GET
exports.breakfast_unavailable_get = function(req, res) {
    res.render('menu-updater/breakfast_unavailable');
}

// Make breakfast unavailable POST
exports.breakfast_unavailable_post = function(req, res) {
    if (req.body.breakfast_unavailable == 'true') {

        Item.updateMany({subcategory: 'Breakfast', name: {$nin: ["Cinnamon Bun", "Chicken And Waffles", "The Sugar Griddle", "Chicken Waffle Sandwich"]}}, {availability: "Unavailable"}, {new: true},
            function (err, results) {
                if (err) {return next(err);}
                else {
                    res.redirect('/menu/update');
                }
            }
        );
    }
};