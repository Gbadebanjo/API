import express  from 'express';
const router = express.Router();
import { register, login, getProducts, getProductbyId, searchProducts } from '../controller/user';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', register); 

router.post('/login', login) 

router.get('/products', getProducts)

router.get('/product/:id', getProductbyId)

router.get('/search', searchProducts);


export default router;
