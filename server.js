const app = require("./src/app")
const mongoose = require("mongoose")
const { createProxyMiddleware } = require('http-proxy-middleware');

mongoose.connect('mongodb+srv://divya:K560bPtwgqgm0kfm@projects.sjyhumk.mongodb.net/king_place?retryWrites=true&w=majority')
.then(()=> console.log("Database connected successfully!"))
.catch(err => console.error(err))
// mongodb+srv://divyaChourasiya:7FerseixchRlYwN3@pbmc.y3bez7u.mongodb.net/king_place?retryWrites=true&w=majority
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
  })
);

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(process.env.PORT || 8000, (req,res)=> {
    console.log(`Server started in port ${process.env.PORT || 8000}`)
})
