const stripe = require("stripe")("sk_test_51NCyjQSG5RXlMLxy7S2E6bpM94Xmp2TifCN8gVrW9pkdKpGhozYYEc8NOGuXc6qJHtVkvWZ4cGhYTbfPCIg48RVM00Cu1Vdwpt");


/* Util function to create stripe customer*/
 exports.createStripeCustomer = async (userData) => {

    return new Promise(async (resolve, reject) => {
        try {
            const Customer = await stripe.customers.create({
                name: 'Divya',
                email: 'divya@gmail.com',
                phone: '8657834534',
                address: {
                    line1: '123 Main Street',
                    line2: 'Apartment 4B',
                    city: 'New York',
                    state: 'NY',
                    postal_code: '10001',
                    country: 'US',
                },
            });
            resolve(Customer);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

// paymentIntent create
exports.paymentIntentData = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: userData?.price,
                currency: userData?.currency,
                customer: userData?.paymentId,
                payment_method: userData?.payment_method_id,
                confirmation_method: "automatic", // For 3D Security
                description: "test King place",
                confirm: false
            });
            resolve(paymentIntent);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

/* Payment Conform  */
exports.paymentConformData = async (paymentIntent, paymentMethod) => {
    return new Promise(async (resolve, reject) => {
        try {
            const intent = await stripe.paymentIntents.confirm(paymentIntent, {
                payment_method: paymentMethod,
            });
            resolve(intent);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}