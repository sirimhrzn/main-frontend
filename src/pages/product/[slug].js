import { useRouter } from 'next/router';

const ProductPage = ({initialData}) => {
	console.log(initialData);
    const router = useRouter();
    const { slug } = router.query;
	const data = {
    		"name": "Shirish Mahrjan",
    		"number": 900000,
    		"location_id": 1,
    		"payment_method": 1,
    		"additional": "",
    		"orders": [
    		    {
    		        "id": 4,
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
		let data = response.json();
		console.log(data);
        	window.location.href = data.redirect_url;
	};
	const product = initialData.data;
	let count = 0;
    return (
	        <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
	    <div className="flex">
    <div className="flex-1 self-start">
        <div className="image-viewer">
            <img className="main" src={product.product_details.metadata.images[0]} alt=""/>
       </div>
    </div>
    <div className="w-9 h-px"></div>
    <div className="flex-1 self-start">
        <div className="product-details">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="mt-4">
                <div className="text-xl font-semibold">रू {product.price}</div>
            </div>
		<p>
	    		{product.product_details.metadata.description}
	    </p>
           <div className="mt-4">Choose Size</div>

            <div className="flex space-x-4 mt-2">
	    {product.product_details.metadata.types.map((value,index) => (
                <div className="flex items-center">
                    <input type="radio" className="hidden" id="size-m" value={value.size}/>
                    <label for="size-m" className="flex items-center space-x-2 cursor-pointer border border-gray-300 rounded px-4 py-2 checked:border-blue-500">
                        <span>{value.size}</span>
                    </label>
                </div>
	    ))}
             </div>
            <div className="mt-6 flex items-center space-x-2">
                <button className="p-2 border border-gray-300 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <div className="w-12">
                    <input type="text" className="w-full text-center border border-gray-300 rounded" value="1"/>
                </div>
                <button className="p-2 border border-gray-300 rounded-full" onClick={()=> count++}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <div className="flex-1 self-start">
	    <a href="/checkout">
                    <button className="h-14 w-full text-lg font-semibold bg-gray-300 text-gray-600 rounded disabled:opacity-50">
	    		Check out
                    </button>
	    </a>
                </div>
            </div>
       </div>
    </div>
</div>

     </div>
    </main>

    );
};

export default ProductPage;

export async function getServerSideProps(context) {
    const { slug } = context.params;
  const vendor_id = 1;
  const product_url = `http://localhost:8012/api/v1/vendor/${vendor_id}/product/public/` + slug;

  const resp = await fetch(product_url);
  const initialData = await resp.json();
  return {
    props: {
      initialData,
    }
  };
}

