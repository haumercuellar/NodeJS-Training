const express = require('express');
const router = express.Router();

//Bring in Article Model
let Training = require('../models/training');


// Delete Training by ID
router.delete('/:id', (req, res)=>{
      
    let query = {_id:req.params.id}
  
    Training.remove(query, (err)=>{
        if(err){
        return console.log(err);        
        } else{
        res.send('Training id:'+ req.params.id + ' deleted');
        }
          
    });
});


// Delete Training by Product Code
router.delete('/by_product_code/:pc', (req, res)=>{
      
    let query = {product_code:req.params.pc}
  
    Training.remove(query, (err)=>{
        if(err){
        return console.log(err);        
        } else{
            res.send('deleted');
        }
          
    });
});





//Add Training
router.post('/', (req, res)=>{
    //Using Express Validator
    req.checkBody('product_code','Product Code is required').notEmpty();
    req.checkBody('saved_assets','Saved Assets is required').notEmpty();
    req.checkBody('saved_assets','Saved Assets is required').notEmpty();
    req.checkBody('saved_assets','Saved Assets must be an Integer').isInt();
    req.checkBody('failed_assets','Failed Assets is required').notEmpty();
    req.checkBody('saved_assets','Failed Assets must be an Integer').isInt();
  
    // Get Express Validator Errors
    let errors = req.validationErrors();
  
    if(errors){
      return res.send(errors);
    }else {


        if (req.body.saved_assets < req.body.failed_assets){
            return res.send('Saved Assets must be greater or equal to Failed Assets');
        } else {
                let product_code = req.body.product_code;
                //Using RegExp for Case Insensitive Validation
                Training.findOne({"product_code":{ $regex: new RegExp('^' + product_code.toLowerCase() + '$', 'i') }}, (err, training)=>{
                    if(err){
                    
                            return console.log(err);      
                            
                    } 
                    
                    
                    
            
                    if(!training){
                        training = new Training();
            
                        training.product_code = req.body.product_code;
                        training.saved_assets = parseInt(req.body.saved_assets);
                        training.failed_assets = parseInt(req.body.failed_assets);
                        training.total_assets = parseInt(req.body.saved_assets) + parseInt(req.body.failed_assets);
            
            
                        training.save((err)=>{
                            if(err){
                            console.log(err);
                                return;
                            } else {
                            res.json(training);
                            }
                        });
                    
                    }else {
                            
                        training.saved_assets = parseInt(training.saved_assets) + parseInt(req.body.saved_assets);
                        training.failed_assets = parseInt(training.failed_assets) + parseInt(req.body.failed_assets);
                        training.total_assets = parseInt(training.total_assets) + parseInt(req.body.saved_assets) + parseInt(req.body.failed_assets);
            
                        training.save((err)=>{
                            if(err){
                            console.log(err);
                                return;
                            } else {
                            res.json(training); 
                            }
                        });
                    }
                    
                
            
            
                
            
                });
            }
        }

}); 


//Update Training by ID
router.put('/:id', (req, res)=>{
    //Using Express Validator
    req.checkBody('product_code','Product Code is required').notEmpty();
    req.checkBody('saved_assets','Saved Assets is required').notEmpty();
    req.checkBody('saved_assets','Saved Assets is required').notEmpty();
    req.checkBody('saved_assets','Saved Assets must be an Integer').isInt();
    req.checkBody('failed_assets','Failed Assets is required').notEmpty();
    req.checkBody('saved_assets','Failed Assets must be an Integer').isInt();
  
    // Get Express Validator Errors
    let errors = req.validationErrors();
  
    if(errors){
      return res.send(errors);
    }else {

            if (req.body.saved_assets < req.body.failed_assets){
                return res.send('Saved Assets must be greater or equal to Failed Assets');
            } else {
                let training = {};
                training.product_code = req.body.product_code;
                training.saved_assets = parseInt(req.body.saved_assets);
                training.failed_assets = parseInt(req.body.failed_assets);
                training.total_assets = parseInt(req.body.saved_assets) + parseInt(req.body.failed_assets);

                let query = {_id:req.params.id};

                Training.update(query, training, (err)=>{
                    if (err){
                        console.log(err);
                        return;
                    } else {
                        Training.findById(req.params.id, (err, update_training)=>{
                            res.json(update_training)});
                    }
                });
            }
        }
    
    
});


//GET Single Training by Product Code
router.get('/by_product_code/:pc',(req, res)=>{
    let product_code = req.params.pc;
    //Using RegExp for Case Insensitive Validation
    Training.findOne({"product_code":{ $regex: new RegExp('^' + product_code.toLowerCase() + '$', 'i') }}, (err, training)=>{
        res.json(training);
    });
    
});



//GET Single Training by id
router.get('/:id',(req, res)=>{
    Training.findById(req.params.id, (err, training)=>{
        res.json(training);
    });
    
});

module.exports = router;