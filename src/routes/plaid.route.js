const express = require('express');
const router = express.Router();
const client = require('../utils/plaidClient');



const linkTokenCreate=async(req,res)=>{

  try {
    const response = await client.linkTokenCreate({
      user: { client_user_id: 'unique_user_id' },
      client_name: 'Your App Name',
      products: ['auth'],
      country_codes: ['US'],
      language: 'en',
    });
    res.status(200).send({ link_token: response.link_token });
  }catch (error) {
    // Handle errors gracefully
    console.error('Error creating link token:', error);

    if (error.error_code === 'MISSING_FIELDS') {
      // Handle missing fields error
      return res.status(400).json({
        error_code: error.error_code,
        error_message: 'Required fields are missing: client_id, secret'+error,
        documentation_url: 'https://plaid.com/docs/?ref=error#invalid-request-errors',
      });
    }

    // General error response
    res.status(500).send({
      error_code: error.error_code || 'UNKNOWN_ERROR',
      error_message: error.error_message || 'An unexpected error occurred'+error,
      request_id: error.request_id || 'N/A',
    });
  }
}

router.route('/create_link_token').post(linkTokenCreate)

// router.route('/create_link_token', async (req, res) => {
//   try {
//     const response = await client.linkTokenCreate({
//       user: { client_user_id: 'unique_user_id' },
//       client_name: 'Your App Name',
//       products: ['auth'],
//       country_codes: ['US'],
//       language: 'en',
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error creating link token');
//   }
// });
// // Route to exchange a public token for an access token
// router.post('set_access_token', async (req, res) => {
//   const { public_token } = req.body;
//   try {
//     const response = await client.itemPublicTokenExchange({ public_token });
//     const { access_token, item_id } = response.data;
//     // Save access_token and item_id securely
//     res.json({ access_token, item_id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error exchanging public token');
//   }
// });



const verifyAccount=async(req,res)=>{

  const { access_token } = req.query;
  try {
    const response = await client.authGet({ access_token });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying account');
  }
}

router.route('/verify_account').get(verifyAccount)

module.exports = router;

