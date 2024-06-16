import {useState} from 'react';
export default function Checkout({paymentOptions,locations}) {
	console.log(locations);
	    const [selectedPayment, setSelectedPayment] = useState(null);
	const handlePaymentSelect = (paymentId) => {
        setSelectedPayment(paymentId); // Update selected payment option

    };
	const data = {
    		"name": "Shirish Mahrjan",
    		"number": 900000,
    		"location_id": 1,
    		"payment_method": 1,
    		"additional": "",
    		"orders": [
    		    {
    		        "id": 1,
    		        "type": "M",
    		        "count": 2
    		    }
    		]
	};

	const payment_url = "http://localhost:8012" + "/api/v1/vendor/1/order/public/place-order";
	const options = {
  		method: 'POST',
  		headers: {
  		  'Content-Type': 'application/json'
  		},
  		body: JSON.stringify(data)
	};
	const response = async () => {
		let response = await fetch(payment_url,options);
		let data = await response.json();
		console.log(data);
        	window.location.href = data.redirect_url;
	};

	return (
	        <main className={`flex min-h-screen flex-col items-center justify-between p-24 `}>
      <div className="z-10 max-w-5xl w-full items-center justify-center  text-sm lg:flex">
	<div className="checkout-grid">
            <div className="information">
               <div className="text-lg font-bold my-4">1. General Information</div>
                <div className="flex space-x-4">
                    <div className="w-1/2 mantine-InputWrapper-root mantine-TextInput-root mantine-xz0z56">
                        <label htmlFor="mantine-r6" className="mantine-InputWrapper-label mantine-TextInput-label mantine-ittua2">Full Name<span className="mantine-u5apz8 mantine-InputWrapper-required mantine-TextInput-required">*</span></label>
                        <input type="text" className="input input-bordered block w-full" placeholder="eg: Ram Bahadur" />
                    </div>
                    <div className="w-1/2 mantine-InputWrapper-root mantine-TextInput-root mantine-xz0z56">
                        <label htmlFor="mantine-r7" className="mantine-InputWrapper-label mantine-TextInput-label mantine-ittua2">Email</label>
                        <input type="text" id="mantine-r7" className="input-bordered input block w-full" placeholder="eg: john@gmail.com" aria-invalid="false" />
                    </div>
                </div>
                <div className="mantine-InputWrapper-root mantine-TextInput-root mantine-xz0z56">
                    <label htmlFor="mantine-r8" className="mantine-InputWrapper-label mantine-TextInput-label mantine-ittua2">Phone Number<span className="mantine-u5apz8 mantine-InputWrapper-required mantine-TextInput-required">*</span></label>
                    <div className="mantine-Input-wrapper mantine-TextInput-wrapper mantine-12sbrde relative">
                        <input type="text" id="mantine-r8" className="input input-bordered  w-full pr-12" placeholder="eg: 9862200000" aria-invalid="false" />
                        <div className="mantine-1n9cu5e mantine-Input-rightSection mantine-TextInput-rightSection absolute top-1/2 transform -translate-y-1/2 right-4">
                            <span className="text-xl">🇳🇵</span>
                        </div>
                    </div>
                </div>
                <div className="mantine-InputWrapper-root mantine-TextInput-root mantine-xz0z56">
                    <label htmlFor="mantine-r9" className="mantine-InputWrapper-label mantine-TextInput-label mantine-ittua2">Order Note (any message for us)</label>
                    <input type="text" id="mantine-r9" className="input-bordered input block w-full" placeholder="eg: I was searching for this product from so long." aria-invalid="false" />
                </div>
                <div className="text-lg font-bold my-4">2. Delivery Address</div>
                <div className="flex space-x-4">
                    <div className="w-1/2 mantine-InputWrapper-root mantine-TextInput-root mantine-2l44qs">
                        <label htmlFor="mantine-rc" className="mantine-InputWrapper-label mantine-TextInput-label mantine-ittua2">Address<span className="mantine-u5apz8 mantine-InputWrapper-required mantine-TextInput-required">*</span></label>
		<select className="select select-bordered w-full max-w-xs">
		{locations.data.map((value,index)=>(
			<option>{value.name}</option>
		))}
		</select>
                    </div>
                </div>
                <div className="text-lg font-bold my-4">3. Payment Methods</div>
                <div className="flex space-x-4">
		{paymentOptions.data.map((value,index)=>(
                    <div className="payment-box-cod">
                        <img src="https://blog.khalti.com/wp-content/uploads/2021/01/khalti-icon.png" alt={value.name} className={`payment-box-cod ${selectedPayment === value.id ? 'border-2 border-blue-500' : ''} w-20 h-20`}  onClick={() => handlePaymentSelect(value.id)} />
                    </div>
		))}
                </div>
            </div>
		<button className="btn my-4" onClick={()=>response()}>
			Continue Payment
		</button>
        </div>
		</div>
		</main>

	);
}
export async function getServerSideProps() {
  const vendor_id = 1;
  const product_url = `http://localhost:8012/api/v1/vendor/${vendor_id}/setting/payments/public/options`;
  const resp = await fetch(product_url);
  const paymentOptions = await resp.json();

  const location_url = `http://localhost:8012/api/v1/global/setting/public/locations`;
  const location_resp = await fetch(location_url);
  const locations = await location_resp.json();
 
  return {
    props: {
      paymentOptions,
      locations
    }
  };
}
