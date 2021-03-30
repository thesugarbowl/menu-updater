var express = require('express');
var router = express.Router();

// Require controller module
var item_controller = require('../controllers/itemController');

// Item routes
// GET menu home page
router.get('/', item_controller.index);

// GET request for updating an item
router.get('/gravlaxisnotalaxative/update', item_controller.item_update_get);

// POST request for updating an  item
router.post('/gravlaxisnotalaxative/update', item_controller.item_update_post);

// GET request for make all food available
router.get('/gravlaxisnotalaxative/allavailable', item_controller.all_available_get);

// POST request for make all food available
router.post('/gravlaxisnotalaxative/allavailable', item_controller.all_available_post);

// GET request for make breakfast unavailable
router.get('/gravlaxisnotalaxative/breakfastunavailable', item_controller.breakfast_unavailable_get);

// POST request for make breakfast unavailable
router.post('/gravlaxisnotalaxative/breakfastunavailable', item_controller.breakfast_unavailable_post);

// GET request for showing item details
router.get('/item/:id', item_controller.item_details_get);

// POST request for showing item details
router.post('/item/:id', item_controller.item_details_post);

// GET request for update confirmation
router.get('/item/:id/confirmed', item_controller.update_confirmation_get);

module.exports = router;