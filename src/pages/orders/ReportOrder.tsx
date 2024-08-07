import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import OrderService from '@/service/OrderService'; // Ensure this import path is correct

const ReportOrder: React.FC = () => {
    const [data, setData] = useState<{ producto: string, totalItemsSold: number, totalSold: number }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch initial data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await OrderService.getTopSellingProducts();
            // Transform the data to match your chart's structure
            const transformedData = response.map(item => ({
                producto: item.productName, // Use productName as producto
                totalItemsSold: item.totalItemsSold, // Use totalItemsSold
                totalSold: item.totalSold, // Use totalSold
            }));
            // Slice to get only the first ten items
            const slicedData = transformedData.slice(0, 10);
            setData(slicedData);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-16">
            <div className="w-full max-w-4xl mb-8">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <BarChart width={700} height={500} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="producto" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalItemsSold" fill="#2563eb" />
                        <Bar dataKey="totalSold" fill="#60a5fa" />
                    </BarChart>
                )}
            </div>
            <div className="flex space-x-4">
                <Button onClick={fetchData}>Top Productos más vendidos</Button>
                {/* <Button onClick={handleChangeData2}>Top Usuarios</Button> */}
            </div>
        </div>
    );
};

export default ReportOrder;
