
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { toast } from "@/components/ui/use-toast";

const data = [
  { type: "Fruit Scraps", kg: 6 },
  { type: "Coffee Grounds", kg: 3 },
  { type: "Veggie Peels", kg: 4 },
  { type: "Citrus", kg: 2 },
];

const COLORS = ["#10B981", "#F59E42", "#60A5FA", "#FBBF24"];

const CompostTypeChart = () => {
  const handleBarClick = (data: any, index: number) => {
    toast({
      title: "Compost Detail",
      description: `You shared ${data.kg} kg of ${data.type} this month!`,
    });
  };

  return (
    <div className="rounded-lg border bg-white p-4 mb-4">
      <div className="font-bold text-green-800 mb-2">Compost Types Shared (This Month)</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} className="cursor-pointer">
          <XAxis dataKey="type" stroke="#666" fontSize={12} />
          <YAxis allowDecimals={false} fontSize={12} />
          <Tooltip />
          <Bar dataKey="kg" fill="#10b981" radius={[8, 8, 0, 0]} onClick={handleBarClick}>
            {data.map((entry, i) => (
              <Cell
                cursor="pointer"
                key={`cell-${i}`}
                fill={COLORS[i % COLORS.length]}
                className="hover:opacity-80"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-gray-500 text-xs mt-2">Click on a bar for details.</div>
    </div>
  );
};

export default CompostTypeChart;
