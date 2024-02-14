import express  from 'express';
const router = express.Router();
import { register, login, getProducts, getProductbyId } from '../controller/user';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', register); 

router.post('/login', login) 

router.get('/products', getProducts)

router.get('/product/:id', getProductbyId)

export default router;
