"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from 'react';


const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8012/api/v1/vendor/1/product/public");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const resp = await response.json();
        console.log('Fetched products:', resp);
        setProducts(resp.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-xl">Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length > 0 ? (
          products.map(product => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.added_by.name}</TableCell>
              <TableCell>{product.enabled === 'y' ? 'Enabled' : 'Disabled'}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">No products available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Page;
