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

// users.js

const User = require('./models/user');

// 檢查用戶密碼是否正確
async function checkPassword(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  return user.password === password;
}

// 登錄
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!checkPassword(email, password)) {
    return res.status(401).send('密碼錯誤');
  }
