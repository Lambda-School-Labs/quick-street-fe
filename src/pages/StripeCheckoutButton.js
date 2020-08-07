import React, { useContext } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Context as CartContext } from '../contexts/TestCartContext';

const StripeCheckoutButton = ({ price, customerId, history }) => {
	const { state, deleteAndAddCart } = useContext(CartContext);
	let cart = state.cart;

	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_h1PiAqFdpVJpFn9xYKA1JEX7008fXbJlqI';

	const onToken = (token) => {

		cart = cart._id;
		axiosWithAuth()
			.post(`/customers/${customerId}/cart/payment`, {
				totalPrice: priceForStripe,
				token: token,
				currency: 'usd'
			})
			.then((res) => {

				deleteAndAddCart({ customerId, cartId: cart });
				// show confirmation
				history.push('/orderconfirmation');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="Market Avenue" // change to vendor?
			image="https://svgshare.com/i/CUz.svg"
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
