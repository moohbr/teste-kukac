import React from "react";

interface StatisticsChartCardProps {
  totalNumber: number;
  percentage: number;
  year: number;
  title: string;
}

function StatisticsChartCard({
  totalNumber,
  percentage,
  year,
  title,
}: StatisticsChartCardProps) {
  return (
    <div className="rounded-lg border bg-old-rose-50 p-4 shadow-sm shadow-old-rose-950 transition-shadow hover:shadow-lg">
      <div className="flex items-start gap-x-4">
        <div className="flex flex-shrink-0 flex-col space-y-2">
          <span className="font-extrabold text-old-rose-400">{title}</span>
          <span className="text-lg font-semibold text-old-rose-900">
            {totalNumber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </div>
      <div className="space-x-2">
        <span
          className={[
            "inline-block rounded px-2 text-sm",
            percentage >= 0
              ? "bg-old-rose-900 text-old-rose-100"
              : "bg-old-rose-300 text-old-rose-900",
          ].join(" ")}
        >
          {percentage}%
        </span>
        <span className="text-old-rose-900">em {year}</span>
      </div>
    </div>
  );
}

export default StatisticsChartCard;
