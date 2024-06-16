
export default function Checkout({paymentOptions,locations}) {
	return (
		<div className="max-w-md mx-auto bg-white p-8 my-10 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Submit Vendor Information</h2>
    <form action="/submit" method="POST" enctype="multipart/form-data">
        <div className="space-y-4">
            <div>
                <label for="vendor_name" className="block text-sm font-medium text-gray-700">Vendor Name</label>
                <input type="text" id="vendor_name" name="vendor_name" placeholder="Enter vendor name"
                       className="form-input mt-1 block w-full rounded-lg"/>
            </div>
            <div>
                <label for="store_name" className="block text-sm font-medium text-gray-700">Store Name</label>
                <input type="text" id="store_name" name="store_name" placeholder="Enter store name"
                       className="form-input mt-1 block w-full rounded-lg"/>
            </div>
            <div>
                <label for="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name"
                       className="form-input mt-1 block w-full rounded-lg"/>
            </div>
            <div>
                <label for="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="number" name="number" placeholder="Enter phone number"
                       className="form-input mt-1 block w-full rounded-lg"/>
            </div>
            <div>
                <label for="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input type="file" id="image" name="image1" accept="image/*"
                       className="form-input mt-1 block w-full rounded-lg"/>
            </div>
            <div className="mt-4">
                <button type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded-lg">
                    Submit
                </button>
            </div>
        </div>
    </form>
</div>

	);
}
