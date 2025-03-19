const express = require('express');
const router = express.Router();
const Stripe = require('stripe')(' sk_test_51R1oSG2NFr3qE2hllpy4wd4RxMCh2NuCmwWgrIDsGiEQUn4Sr3rUfdVXunJbGEWgIwkwgBw1qL8is59mGalgrHT9007Urz0bhu');

router.post('/', async (req, res) => {
    try {
    const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: Object.values(req.body.cartDetails).map(item => ({
    price_data: {
    currency: "usd",
    product_data: {
    name: item.designation,
    images:[item.imageart]
    },
    unit_amount: item.prix * 100,
    },
    quantity: item.cartQuantity,
    })),
    success_url: `${process.env.CLIENT_URL}`,
    cancel_url: `${process.env.CLIENT_URL}`,
    })
    res.json({ sessionId: session.id })
    } catch (e) {
    res.status(500).json({ error: e.message })
    }
    });
    module.exports = router;