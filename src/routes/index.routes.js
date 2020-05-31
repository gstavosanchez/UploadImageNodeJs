const {Router} = require('express')
const path = require('path');

const router = Router();




//Ruta
router.get('/',(req,res) =>{
    res.render('index');
});

router.post('/upload',(req,res) => { /// Peticion post de la imagen 
    console.log(req.file)
    res.send('uploaded');
});

module.exports = router;