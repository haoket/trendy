import express from 'express';
import crypto from 'crypto';
import axios from 'axios';

import { vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_ReturnUrl } from '../config/config.js';

import bodyParser from 'body-parser';
import dateFormat from 'dateformat';
import qs from 'qs';



import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  createOrderItem,
  getOrderByStatus,
  updateStatusOrder,
  getAllOrder
} from '../controllers/ordersControllers.js';

const orderRoutes = (app) => {




  const tmnCode = vnp_TmnCode;
  const secretKey = vnp_HashSecret;
  const vnpUrl = vnp_Url;
  const returnUrl = vnp_ReturnUrl;
  app.route('/create-order').post(createOrder);
  app.route('/create-order-item').post(createOrderItem);


  app.route('/orders/:id')
    .get(getOrderById)

  app.route('/update-orders-status/:id').put(updateStatusOrder)


  app.route('/getOrderByStatus').get(getOrderByStatus);

  app.route('/getAllOrders').get(getAllOrder);




  app.post('/create_payment_url', (req, res) => {
    try {
      var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      var tmnCode = vnp_TmnCode;
      var secretKey = vnp_HashSecret;
      var vnpUrl = vnp_Url;
      var returnUrl = vnp_ReturnUrl;

      var date = new Date();
      var createDate = dateFormat(date, 'yyyymmddHHmmss');
      var orderId = dateFormat(date, 'HHmmss');
      var amount = req.body.amount;
      var bankCode = req.body.bankCode;

      var orderInfo = req.body.orderDescription;
      var orderType = req.body.orderType;
      var locale = req.body.language || 'vn';
      var currCode = 'VND';

      var vnp_Params = {
        'vnp_Version': '2.1.0',
        'vnp_Command': 'pay',
        'vnp_TmnCode': tmnCode,
        'vnp_Locale': locale,
        'vnp_CurrCode': currCode,
        'vnp_TxnRef': orderId,
        'vnp_OrderInfo': orderInfo,
        'vnp_OrderType': orderType,
        'vnp_Amount': amount * 100,
        'vnp_ReturnUrl': returnUrl,
        'vnp_IpAddr': ipAddr,
        'vnp_CreateDate': createDate
      };

      // Tăng thời gian chờ lên 30 phút (hoặc số giây tùy chọn)
      var expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 30); // Tăng thời gian chờ lên 30 phút
      vnp_Params['vnp_ExpireDate'] = dateFormat(expirationTime, 'yyyymmddHHmmss');

      if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
      }

      vnp_Params = sortObject(vnp_Params);

      var signData = qs.stringify(vnp_Params, { encode: false });
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
      vnp_Params['vnp_SecureHash'] = signed;
      vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

      res.redirect(vnpUrl);
    } catch (error) {
      console.error('Error creating VNPAY payment URL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

};

function sortObject(obj) {
  return Object.keys(obj).sort().reduce((sorted, key) => {
    sorted[key] = obj[key];
    return sorted;
  }, {});
}

export default orderRoutes;
