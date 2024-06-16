import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({initialData}) {
	console.log(initialData.data);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        
	      	<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
	  	{
		  initialData.data.length !== 0 ? initialData.data.map((product,index)=>(
			<Product id={product.id} name={product.name} price={product.price} image={product.product_details.metadata.images[0]} />
		  )) :
			<p> No products available</p>
	  	}
	  </div>

     </div>
    </main>
  );
}
const Product = ({id,name,price,image}) => {
	let href = "/product/" + id;
	return (
		<a href={href} className="block p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow duration-300">
		  <div className="product-item">
		    <div className="img-wrap">
		      <img 
		        src={image}
		        alt="Oversized Slam Dunk Tee"
		        className="w-full h-auto rounded" />
		    </div>
		    <div className="mt-4">
		      <div className="text-lg font-semibold">{name}</div>
		      <div className="mt-2 text-gray-500">
		        <div className="text-lg font-bold">रू {price}</div>
		      </div>
		    </div>
		  </div>
		</a>
	)

}
export async function getServerSideProps(context) {
  const { req } = context;
  const vendor_id = req['vendor_id'] ?? 1;
	
  const product_url = `http://localhost:8012/api/v1/vendor/${vendor_id}/product/public`;
	console.log(product_url);

  const resp = await fetch(product_url);
  const initialData = await resp.json();
  return {
    props: {
      initialData
    }
  };
}
