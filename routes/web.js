const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cartController=require('../app/http/controllers/customers/cartController');
const menuController=require('../app/http/controllers/menuController');
function initRoutes(app){
    
    app.get('/',homeController().index)
//     (req,res)=>{
//     res.render('home');
// }
app.get('/login',authController().login)
// (req,res)=>{
//     res.render('login');
// }
app.get('/menu',menuController().index)
// (req,res)=>{
//     res.render('menu');
// }
app.get('/cart',cartController().index)
// (req,res)=>{
//     res.render('customers/cart');
// }
app.post('/update-cart',cartController().update)
}

module.exports=initRoutes;