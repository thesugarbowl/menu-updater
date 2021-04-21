#! /usr/bin/env node

// IMPORTANT! When creating a new menu item for the database, ensure 'price_reg' is set to '', not false
// or else price_reg will actually display as 'false' in database & html files. (I have done this below! - Mar 27, 2021)

console.log('This script populates some test wait sessions to your database. Specified database as argument - e.g.: dummyWaitlistDB mongodb+srv://patricialan:development@cluster0.a9azn.mongodb.net/menu-dev?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []

function itemCreate(name, name_f, category, subcat, price_reg, price_l, price_b, descript, diet_restrict, availability, cb) {
  itemdetail = {name:name , category:category, price_reg:price_reg, availability:availability}
  if (name_f != false) itemdetail.name_feature = name_f
  if (subcat != false) itemdetail.subcategory = subcat
  if (price_l != false) itemdetail.price_large = price_l
  if (price_b != false) itemdetail.price_bottle = price_b
  if (descript != false) itemdetail.description = descript
  if (diet_restrict != false) itemdetail.diet = diet_restrict
  
  var item = new Item(itemdetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}

function createItems(cb) {
    async.parallel([
        // function(callback) {
        //   itemCreate('Alleykat Aprikat Apricot Ale', false, 'Beverages', ['Beer/Cider'], '6.50', false, false, 'Edmonton / 355 mL / 5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Analog Hive Bomber Honey Wheat', false, 'Beverages', ['Beer/Cider'], '8.25', false, false, 'Edmonton / 473 mL / 4.3%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Annex Force Majeure NE IPA', false, 'Beverages', ['Beer/Cider'], '9', false, false, 'Calgary / 473 mL / 6.9%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('The Dandy Brewing Company T2G IPA', false, 'Beverages', ['Beer/Cider'], '9', false, false, 'Calgary / 473 mL / 7.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Apex Predator Double IPA', false, 'Beverages', ['Beer/Cider'], '9', false, false, 'Yellowhead County, AB / 473 mL / 8.2%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Blindman Triphammer Porter', false, 'Beverages', ['Beer/Cider'], '9', false, false, 'Lacombe, AB / 473 mL / 6.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Brauerei Fahr AB Hefeweizen', false, 'Beverages', ['Beer/Cider'], '6.50', false, false, 'Turner Valley, AB / 355 mL / 5.3%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Brauerei Fahr AB Copper', false, 'Beverages', ['Beer/Cider'], '6.50', false, false, 'Turner Valley, AB / 355 mL / 5.3%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Collective Arts Apple-Cherry Cider', false, 'Beverages', ['Beer/Cider'], '9', false, false, 'Ontario / 473 mL / 5.8%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Collective Arts Apple Cider', false, 'Beverages', ['Beer/Cider'], '9', false, false, 'Ontario / 473 mL / 5.8%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Revel Cider Prosthetic Conscience', false, 'Beverages', ['Beer/Cider'], '9.25', false, false, '330 mL / 5.5% / Gluten-Free / Niagara, Ontario / Unfiltered pear, hibiscus, brettanomyces. Dry, funky, fruity pear notes infused with tart floral hibiscus. Light red fruit in colour, dry, and wacky. Farmhouse cider.', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Revel Sonata Cherry Cider', false, 'Beverages', ['Beer/Cider'], '10', false, false, '355 mL / Niagara, Canada / Whole Montmorency cherries added (pits, skins, and stems). Almond, dark rapture, lovely, smooth and wacky unfiltered cider.', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Sourwood Wabamo Dry Hopped Cider', false, 'Beverages', ['Beer/Cider'], '10', false, false, '473 mL / 6% / Halifax, Nova Scotia / A dry cider, dry-hopped. Just apple and hops. Like an IPA but for people for like cider. A cider that likes to party.', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Sourwood Plumbum', false, 'Beverages', ['Beer/Cider'], '12', false, false, '330 mL / Halifax, Nova Scotia / Spontaneously fermented northern spy (barrel-aged). Then aged on Nova Scotia damson plums (6 months fruit contact) and conditioned with apple juice. Sourwood makes ciders taste like lambic-style beer. Extremely dry, esters, tight acidity, puckering, and sharp. Ciders that can penetrate meat and cheese, or refresh the dead.', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Sourwood Semitone', false, 'Beverages', ['Beer/Cider'], '12', false, false, '330 mL / 6% / Gluten-Free / Halifax, Nova Scotia / Cider aged on 2nd-use blueberries (5 months skin contact). Wine-like acidity, tight, sharp, experimental. Notes of berries on the nose, semi-funky, unfiltered, and wild.', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('DDC Aphrodisiaque Strong Stout', false, 'Beverages', ['Beer/Cider'], '8', false, false, 'Quebec / 341 mL / 6.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Mongozo GF Pilsner', false, 'Beverages', ['Beer/Cider'], '8', false, false, 'Belgium / 330 mL / 5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('New Level Berserker Blonde', false, 'Beverages', ['Beer/Cider'], '8.25', false, false, 'Calgary / 473 mL / 5.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Sea Change Prairie Fairy Blackberry Wheat', false, 'Beverages', ['Beer/Cider'], '8.75', false, false, 'Edmonton / 473 mL / 5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('SYC Pontification Italian Pilsner', false, 'Beverages', ['Beer/Cider'], '9', false, false, 'Edmonton / 473 mL / 4.9%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Annex Ale Project Good Authority Golden Ale', false, 'Beverages', ['Beer/Cider'], '9', false, false, 'Calgary / 473 mL / 4.9%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Townsquare Forged Amber Rye Ale', false, 'Beverages', ['Beer/Cider'], '8.25', false, false, 'Edmonton / 473 mL / 5.2%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Achel Blond', false, 'Beverages', ['Beer/Cider'], '11', false, false, '330 mL / 8%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Chimay Red', false, 'Beverages', ['Beer/Cider'], '12', false, false, '330 mL / 7%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Chimay White', false, 'Beverages', ['Beer/Cider'], '12.50', false, false, '330 mL / 8%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Chimay Blue', false, 'Beverages', ['Beer/Cider'], '11', false, false, '330 mL / 9%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Dupont Avec Les Bons Voeux', false, 'Beverages', ['Beer/Cider'], '27', false, false, '750 mL / 9.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Gouden Carolus Classic', false, 'Beverages', ['Beer/Cider'], '12', false, false, '330 mL / 8.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Kwak', false, 'Beverages', ['Beer/Cider'], '11', false, false, '330 mL / 8.4%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('La Guillotine', false, 'Beverages', ['Beer/Cider'], '12', false, false, '330 mL / 8.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Lindemans Oude Gueuze Cuvée René Lambic', false, 'Beverages', ['Beer/Cider'], '13', false, false, '5.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Orval Trappist Ale', false, 'Beverages', ['Beer/Cider'], '13', false, false, '6.9%', false, '', callback);
        // }
        // function(callback) {
        //   itemCreate('Rochefort 6', false, 'Beverages', ['Beer/Cider'], '11', false, false, '330 mL / 7.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Rochefort 8', false, 'Beverages', ['Beer/Cider'], '12', false, false, '330 mL / 9.2%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Westmalle Dubbel', false, 'Beverages', ['Beer/Cider'], '11', false, false, '330 mL / 7%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Westmalle Tripel', false, 'Beverages', ['Beer/Cider'], '11', false, false, '330 mL / 9.5%', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #1', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #2', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #3', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #4', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #5', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #6', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #7', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #8', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #9', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Draft #10', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #1', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #2', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #3', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #4', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #5', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #6', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #7', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #8', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #9', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Feature Bottle/Can #10', false, 'Beverages', ['Rotating Feature Beers'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Clos du Soleil Célestiale . Meritage '16", false, 'Beverages', ['Wine'], '14', '19', '52', 'Similkameen Valley, BC', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Clos du Soleil Capella . White Meritage '18", false, 'Beverages', ['Wine'], '14', '19', '52', 'Similkameen Valley, BC', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Lapis Luna . Zinfandel '19", false, 'Beverages', ['Wine'], '10', '14', '38', 'California', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Lapis Luna . Chardonnay '18", false, 'Beverages', ['Wine'], '10', '14', '38', 'California', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Wild Goose . Gewürtztraminer '18", false, 'Beverages', ['Wine'], '11', '15', '40', 'Okanagan Valley, BC', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Rosewood . Night Moves . Gamay '17", false, 'Beverages', ['Wine'], '', false, '58', 'Niagara / 750 mL', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Laughing Stock . Portfolio Red '18", false, 'Beverages', ['Wine'], '', false, '85', 'Okanagan Valley, BC / 750 mL', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Pearl Morissette Cuvée Sputnik . Riesling '17", false, 'Beverages', ['Wine'], '', false, '55', 'Niagara / 750 mL', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Mionetto Prosecco DOC Treviso Brut", false, 'Beverages', ['Wine'], '', false, '9', 'Italy / 187 mL', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Frico Lambrusco Sparkling Red", false, 'Beverages', ['Wine'], '10', false, false, 'Italy / 250 mL', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Benjamin Bridge Pétillant Naturel Sparkling", false, 'Beverages', ['Wine'], 'Market Price', false, false, 'Nova Scotia / 250 mL', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Richvale Pool Party Rosé", false, 'Beverages', ['Wine'], '12', false, false, 'California / 250 mL', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Vodka: Grey Goose", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Vodka: CIROC", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Gin: Tempo", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Gin: Ophir", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Gin: Long Table Cucumber", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Tequila: Arette Blanco", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Tequila: Espolòn Reposado", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Tequila: Mezcal Pelotón", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Whiskey: Glendalough Irish", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Whiskey: Forty Creek Copper Pot", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Whiskey: Nikka Coffee Still Malt (Japan)", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Whiskey: Lot 40 Rye", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Scotch: Adelphi Private Stock Blend", false, 'Beverages', ['Spirits'], '10', '16', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Scotch: Glengoyne 12", false, 'Beverages', ['Spirits'], '10', '16', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Scotch: Caol Ila 12", false, 'Beverages', ['Spirits'], '10', '16', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Scotch: Laphroaig Select", false, 'Beverages', ['Spirits'], '10', '16', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Scotch: Glenrothes 12", false, 'Beverages', ['Spirits'], '10', '16', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Bourbon: 1792", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Bourbon: Buffalo Trace", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Bourbon: Bulleit", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Bourbon: Knob Creek", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Bourbon: Four Roses", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Bourbon: Old Grand Dad", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Bourbon: Sazerac", false, 'Beverages', ['Spirits'], '9', '13', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Rum: El Dorado 3 yr", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Rum: El Dorado 12 yr", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Rum: Blackpool Spiced", false, 'Beverages', ['Spirits'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Boulevardier", false, 'Beverages', ['Cocktails'], '15', false, false, '3 oz / Bourbon, Sweet Vermouth, Italian Bitter', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Grandmother's Purse", false, 'Beverages', ['Cocktails'], '14', false, false, '2.5 oz / Dark Rum, Nonino Amaro, Lime, Cocoa Bitters', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Horse With No Mane", false, 'Beverages', ['Cocktails'], '14', false, false, '2 oz / Arette Blanco Tequila, Smoked Chili Watermelon Syrup, Bitters, Black Lime, Mint Sprig', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Penicillin", false, 'Beverages', ['Cocktails'], '14', false, false, '2 oz / Peaty Scotch, Mulled Heather Honey, Ginger, Turmeric, Lemon, Cardamom', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Mimosa", false, 'Beverages', ['Cocktails'], '11', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Sangria: Red", false, 'Beverages', ['Cocktails'], '11', false, false, '3 oz', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Sangria: White", false, 'Beverages', ['Cocktails'], '11', false, false, '3 oz', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Caesar", false, 'Beverages', ['Cocktails'], '8', '12', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("B52", false, 'Beverages', ['Specialty Coffees'], '8', '12', false, 'Kahlua, Grand Marnier, Baileys', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("After 8", false, 'Beverages', ['Specialty Coffees'], '8', '12', false, 'Crème de Cacao, Crème de Menthe, Rye', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Monte Cristo", false, 'Beverages', ['Specialty Coffees'], '8', '12', false, 'Kahlua, Grand Marnier', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Spanish", false, 'Beverages', ['Specialty Coffees'], '8', '12', false, 'Kahlua, Brandy', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Irish", false, 'Beverages', ['Specialty Coffees'], '8', '12', false, 'Glendalough Whiskey, Whipped Cream', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Tiramisu", false, 'Beverages', ['Specialty Coffees'], '8', '12', false, 'Frangelico, Almond Baileys, Hot Chocolate, Espresso', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("House-Made Chai Latte", false, 'Beverages', ['Coffee & Non-Alcoholic'], '4.50', '5.50', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Hot Chocolate", false, 'Beverages', ['Coffee & Non-Alcoholic'], '4', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("London Fog", false, 'Beverages', ['Coffee & Non-Alcoholic'], '4', false, false, false, false, '', callback);
        // },
        function(callback) {
          itemCreate("Cold Brew", false, 'Beverages', ['Coffee & Non-Alcoholic'], '4', false, false, "Kaffa Roastery's hot extracted Ethiopian Guji, rapidly chilled. Option of sweetened/unsweetened.", false, '', callback);
        }
        // function(callback) {
        //   itemCreate("Pop: Coca-Cola", false, 'Beverages', ['Coffee & Non-Alcoholic'], '3', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Pop: Diet Coke", false, 'Beverages', ['Coffee & Non-Alcoholic'], '3', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Pop: Sprite", false, 'Beverages', ['Coffee & Non-Alcoholic'], '3', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Pop: Ice Tea", false, 'Beverages', ['Coffee & Non-Alcoholic'], '3', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Pop: Ginger Ale", false, 'Beverages', ['Coffee & Non-Alcoholic'], '3', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("S.Pellegrino: Blood Orange", false, 'Beverages', ['Coffee & Non-Alcoholic'], '3', false, false, '330 mL Can', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("S.Pellegrino: Clementine", false, 'Beverages', ['Coffee & Non-Alcoholic'], '3', false, false, '330 mL Can', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("S.Pellegrino: Lemon", false, 'Beverages', ['Coffee & Non-Alcoholic'], '3', false, false, '330 mL Can', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("S.Pellegrino: Pomegranate-Orange", false, 'Beverages', ['Coffee & Non-Alcoholic'], '3', false, false, '330 mL Can', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("S.Pellegrino Sparkling Mineral Water: 250 mL", false, 'Beverages', ['Coffee & Non-Alcoholic'], '2.50', false, false, '250 mL Bottle', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("S.Pellegrino Sparkling Mineral Water: 750 mL", false, 'Beverages', ['Coffee & Non-Alcoholic'], '5', false, false, '750 mL Bottle', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Annex: Root Beer", false, 'Beverages', ['Coffee & Non-Alcoholic'], '5', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Annex: Saskatoon Lemonade", false, 'Beverages', ['Coffee & Non-Alcoholic'], '5', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("New Level Painapple Punch Craft Soda", false, 'Beverages', ['Coffee & Non-Alcoholic'], '6', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Royal Jamaican Ginger Beer", false, 'Beverages', ['Coffee & Non-Alcoholic'], '5', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Stiegl Freibier Non-Alcoholic", false, 'Beverages', ['Coffee & Non-Alcoholic'], '6', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Fancy Tonic", false, 'Beverages', ['Coffee & Non-Alcoholic'], '4', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Cinnamon Bun", false, 'Food', ['Breakfast','Desserts'], '5', false, false, 'Baked daily', ['Vegetarian'], '', callback);
        // },
        // function(callback) {
        //   itemCreate("Breakfast Sandwich", false, 'Food', ['Breakfast'], '14', false, false, 'Daily Feature on Eleanor & Laurent bread with side potatoes', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Burrito", false, 'Food', ['Breakfast'], '14', false, false, 'Daily Feature with side potatoes', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Omelette", false, 'Food', ['Breakfast'], '14', false, false, 'Daily Feature with side potatoes and Eleanor & Laurent bread', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Sugarbowl Benny", false, 'Food', ['Breakfast'], '16', false, false, '2 poached eggs on back bacon and cornbread, Applewood smoked cheddar béchamel sauce, and side potatoes', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Huevos Rancheros", false, 'Food', ['Breakfast'], '16', false, false, '2 poached eggs on cheddar cheese, spicy beans (black and red kidney beans), and fried corn tortillas, with cilantro garnish and side salsa verde', ['Gluten-Free', 'Vegetarian'], '', callback);
        // },
        // function(callback) {
        //   itemCreate("Chicken And Waffles", false, 'Food', ['Breakfast', 'Lunch & Dinner'], '19', false, false, 'Breaded chicken breast on Belgian waffles with watermelon salsa and maple butter', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Vegan Sausage And Tofu Scramble", false, 'Food', ['Breakfast'], '16', false, false, 'Vegan sausage, tofu, roasted yam, kale, onions, mixed bell peppers, nutritional yeast, and turmeric, with side of Eleanor & Laurent bread', ['Vegan'], '', callback);
        // },
        // function(callback) {
        //   itemCreate("French Toast", false, 'Food', ['Breakfast'], '16', false, false, 'Slices of house-made brioche or cinnamon bun with icing sugar, berry compote (blueberry, raspberry, and strawberry), and side crème fraîche', ['Vegetarian'], '', callback);
        // },
        // function(callback) {
        //   itemCreate("The Sugar Griddle", false, 'Food', ['Breakfast', 'Lunch & Dinner'], '10', false, false, 'Half waffle with a fried egg, 2 pieces of Four Whistle Farms back bacon, provolone cheese, and maple butter.', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Chicken Waffle Sandwich", false, 'Food', ['Breakfast', 'Lunch & Dinner'], '15', false, false, 'Full waffle folded over with a piece of chicken, maple butter, and watermelon salsa', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Chicken Salad Sandwich", false, 'Food', ['Lunch & Dinner'], '14', false, false, '6 oz shredded rotisserie chicken from La Petite Iza tossed in a house celery mayo dressing with arugula and tomato on Eleanor & Laurent sourdough bread.', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("The Heady Vegetarian Sandwich", false, 'Food', ['Lunch & Dinner'], '13', false, false, 'Pan-seared tofu and Eleanor & Laurent sourdough bread with our house almond spread, nutritional yeast, Dijon, tabasco lime honey, tomato, arugula, and red onion.', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Smoked Paprika Popcorn', false, 'Food', ['Lunch & Dinner'], '5', false, false, false, ['Vegan'], '', callback);
        // },
        // function(callback) {
        //   itemCreate('Almond Spread With Pita Bread', false, 'Food', ['Lunch & Dinner'], '16', false, false, 'Almonds jalapeños, garlic, and grapeseed oil', ['Vegan'], '', callback);
        // },
        // function(callback) {
        //     itemCreate('Pommes Frites', false, 'Food', ['Lunch & Dinner'], '6', '9', false, 'With chipotle mayo and ketchup', ['Vegan'], '', callback);
        // },
        // function(callback) {
        // itemCreate('Yam Fries', false, 'Food', ['Lunch & Dinner'], '8', false, false, 'With chipotle mayo and ketchup', ['Vegan'], '', callback);
        // },
        // function(callback) {
        //     itemCreate('Soup Of The Day', false, 'Food', ['Lunch & Dinner'], '', '', false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Brunch Feature', false, 'Food', ['Breakfast'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Lunch Feature #1', false, 'Food', ['Lunch & Dinner'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Lunch Feature #2', false, 'Food', ['Lunch & Dinner'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Dinner Feature #1', false, 'Food', ['Lunch & Dinner'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Dinner Feature #2', false, 'Food', ['Lunch & Dinner'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Caesar Salad', false, 'Food', ['Lunch & Dinner'], '5.24', '14', false, 'Romaine lettuce, kale, Parmesan cheese, bread crumbs, garlic caper dressing. Large size comes with side cornbread.', ['Vegetarian'], '', callback);
        // },
        // function(callback) {
        //   itemCreate('Lamb Burger', false, 'Food', ['Lunch & Dinner'], '19', false, false, 'Lamb patty, chèvre, caramelized onions, lettuce, tomato, pickles, rosemary mayo, on house-made brioche bun, with choice of side', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Beef Burger', false, 'Food', ['Lunch & Dinner'], '18', false, false, 'Beef patty, Gruyère cheese, red onion, lettuce, tomato, pickles, honey dill mayo, on house-made brioche bun, with choice of side', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Veggie Burger', false, 'Food', ['Lunch & Dinner'], '16', false, false, 'Veggie patty (black beans, quinoa, mushrooms, and oats), lettuce, tomato, pickles, rosemary mayo, on house-made brioche bun, with choice of side', ['Vegetarian'], '', callback);
        // },
        // function(callback) {
        //   itemCreate('Pulled Pork Sandwich', false, 'Food', ['Lunch & Dinner'], '18', false, false, 'Pulled pork, slaw (cabbage, carrot, and apple), house BBQ sauce, chipotle mayo, on house-made brioche bun, with choice of side', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate('Jerk Chicken Sandwich', false, 'Food', ['Lunch & Dinner'], '17', false, false, 'Jerk chicken breast, red onion, lettuce, tomato, pickles, avocado mayo, on house-made brioche bun, with choice of side', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Mac' And Cheese", false, 'Food', ['Lunch & Dinner'], '16', false, false, 'Macaroni, Applewood smoked cheddar béchamel sauce, and breadcrumbs. Add bacon (+3) / chicken (+5) / pulled pork (+7).', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Chicken Curry Stew", false, 'Food', ['Lunch & Dinner'], '16', false, false, 'Curry (chicken thighs, sweet potatoes, bell peppers, celery, and coconut milk) on white rice, with toasted coconut and cilantro garnish, and side pita', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Bison Chili", false, 'Food', ['Lunch & Dinner'], '16', false, false, 'Chili (bison, red and white kidney beans, bell peppers, celery, onions, and tomatoes) with sour cream garnish and side cornbread', false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Dessert Feature", false, 'Food', ['Desserts'], '', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Cheesecake Of The Day", false, 'Food', ['Desserts'], '8.50', false, false, false, false, '', callback);
        // },
        // function(callback) {
        //   itemCreate("Banana Cream Pie", false, 'Food', ['Desserts'], '8', false, false, 'Vanilla custard, sliced bananas, Graham cracker crust, and whipped cream', false, '', callback);
        // }
        ],
        // optional callback
        cb);
}

async.series([
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});