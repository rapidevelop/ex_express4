import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

const router = express.Router();

const firstMiddleware = (req, res, next) => {
  req.timestamp = Date.now();
  console.log(
    `A ${req.method} request received on ${req.originalUrl} at ${req.timestamp}`,
  );
  next();
};

router.use(firstMiddleware);

const secondMiddleware = (req, res, next) => {
  console.log(`Before response to the request received at ${req.timestamp}`);
  next();
};

router.use(secondMiddleware);

router.get('/', (req, res, next) => {
  res.send('Hello Express!');
  next();
});

const thirdMiddleware = (req, res, next) => {
  console.log(`After response to the request received at ${req.timestamp}`);
  next();
};

router.use(thirdMiddleware);
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
