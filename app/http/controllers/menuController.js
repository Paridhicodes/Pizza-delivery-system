const Menu=require('../../models/menu')
function menuController(){
    return {
        index(req,res){
            Menu.find().then(function(pizzas){
                // console.log(pizzas);
                res.render('menu',{pizzas:pizzas})
                
            })
            
        }
    }
}

module.exports=menuController;