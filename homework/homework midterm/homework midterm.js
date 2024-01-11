const express = require('express');
const router = express.Router();

router.post('/users', async (req, res) => {
  const { email, password } = req.body;

  // 檢查用戶是否已存在
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).send('用戶已存在');
  }

  // 創建新用戶
  const newUser = new User({
    email,
    password,
  });
  await newUser.save();

  // 返回用戶信息
  res.status(200).send(newUser);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 檢查用戶密碼是否正確
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send('用戶不存在');
  }

  if (!checkPassword(user.password, password)) {
    return res.status(401).send('密碼錯誤');
  }

  // 生成 JWT 令牌
  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

  // 返回令牌
  res.status(200).send({ token });
});

// users.js

const User = require('./models/user');

// 檢查用戶密碼是否正確
async function checkPassword(password, expectedPassword) {
  return await bcrypt.compare(password, expectedPassword);
}
請謹慎使用程式碼。瞭解詳情
博客管理功能的實現：

JavaScript
// app.js

router.get('/blogs', async (req, res) => {
  // 查詢所有博客
  const blogs = await Blog.find();

  // 返回博客列表
  res.status(200).send(blogs);
});

router.post('/blogs', async (req, res) => {
  const { title, content, author } = req.body;

  // 創建新博客
  const newBlog = new Blog({
    title,
    content,
    author,
  });
  await newBlog.save();

  // 返回博客信息
  res.status(200).send(newBlog);
});

router.get('/blogs/:id', async (req, res) => {
  // 查詢指定博客
  const blog = await Blog.findById(req.params.id);

  // 返回博客信息
  res.status(200).send(blog);
});

router.patch('/blogs/:id', async (req, res) => {
  const { title, content } = req.body;

  // 更新博客信息
  const blog = await Blog.findByIdAndUpdate(req.params.id, {
    title,
    content,
  });

  // 返回博客信息
  res.status(200).send(blog);
