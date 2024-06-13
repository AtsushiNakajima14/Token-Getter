const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/EAAAAU', async (req, res) => {
    const { user, passw } = req.body;
    try {
        const response = await axios.get(`https://b-api.facebook.com/method/auth.login`, {
            params: {
                email: user,
                password: passw,
                format: 'json',
                generate_session_cookies: '1',
                generate_machine_id: '1',
                generate_analytics_claim: '1',
                locale: 'en_US',
                client_country_code: 'US',
                credentials_type: 'device_based_login_password',
                fb_api_caller_class: 'com.facebook.account.login.protocol.Fb4aAuthHandler',
                fb_api_req_friendly_name: 'authenticate',
                api_key: '882a8490361da98702bf97a021ddc14d',
                access_token: '350685531728|62f8ce9f74b12f84c123cc23437a4a32'
            }
        });
        const data = response.data;
        if (data.access_token) {
            res.send({ token: data.access_token });
        } else {
            res.send({ error: data.error_msg });
        }
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.post('/EAADYP', async (req, res) => {
    const { user, passw } = req.body;
    try {
        const response = await axios.get(`https://b-api.facebook.com/method/auth.login`, {
            params: {
                access_token: '237759909591655|0f140aabedfb65ac27a739ed1a2263b1',
                format: 'json',
                sdk_version: '1',
                email: user,
                locale: 'en_US',
                password: passw,
                sdk: 'ios',
                generate_session_cookies: '1',
                sig: '3f555f98fb61fcd7aa0c44f58f522efm'
            }
        });
        const data = response.data;
        if (data.access_token) {
            res.send({ token: data.access_token });
        } else {
            res.send({ error: data.error_msg });
        }
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
