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

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8012/api/v1/vendor/1/order/admin/orders");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const resp = await response.json();
        console.log('Fetched orders:', resp);
        setOrders(resp.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order ID</TableHead>
          <TableHead>Payment Identifier</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length > 0 ? (
          orders.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.payment_identifier}</TableCell>
              <TableCell>{order.location_id}</TableCell>
              <TableCell>${order.total_amount}</TableCell>
              <TableCell>{order.payment_method_id}</TableCell>
              <TableCell>{order.payment_status}</TableCell>
              <TableCell>{order.order_status}</TableCell>
              <TableCell>{order.updated_at}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center">No orders available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersPage;

