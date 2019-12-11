const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const gOatmeal_controller = require('../controllers/gOatmeal.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', gOatmeal_controller.test);
router.get('/create', gOatmeal_controller.recipe_create);
router.post('/create', gOatmeal_controller.recipe_create);
router.get('/:id', gOatmeal_controller.gOatmeal_details);
router.put('/:id/update', gOatmeal_controller.gOatmeal_update);
router.delete('/:id/delete', gOatmeal_controller.gOatmeal_delete);

module.exports = router;