const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cartController=require('../app/http/controllers/customers/cartController');
const orderController=require('../app/http/controllers/customers/orderController');
const menuController=require('../app/http/controllers/menuController');
const guest=require('../app/http/middlewares/guest')
function initRoutes(app){
    
    app.get('/',homeController().index)
//     (req,res)=>{
//     res.render('home');
// }
app.get('/login',guest,authController().login)
app.post('/login',authController().postLogin)
app.get('/register',guest,authController().register)
app.post('/register',authController().postRegister)
// (req,res)=>{
//     res.render('login');
// }
// app.post('/login',authController().postLogin)
// app.get('/register',authController().register)
// app.post('/register',authController().postRegister)
app.post('/logout',authController().logout)
app.get('/menu',menuController().index)
// (req,res)=>{
//     res.render('menu');
// }
app.get('/cart',cartController().index)
// (req,res)=>{
//     res.render('customers/cart');
// }
app.post('/update-cart',cartController().update)
app.post('/orders',orderController().store)
app.get('/customers/orders',orderController().index)
}


module.exports=initRoutes;