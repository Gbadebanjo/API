import express  from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  res.json({name, email, password});
}
);

export default router;
