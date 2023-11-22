const express = require("express");
const notesController = require("../controllers/notesController");
const usersController = require("../controllers/usersController.js");
const requireAuth = require('../middleware/requireAuth.js');


const app = express();
const router = express.Router();

app.use(express.json());


router.post('/', notesController.createNote);

router.get('/', notesController.fetchNotes);

router.get('/:id', notesController.fetchNote);

router.put('/:id', notesController.updateNote);

router.delete('/:id', notesController.deleteNote);

router.get("/check-auth", requireAuth, usersController.checkAuth);



module.exports = router;
