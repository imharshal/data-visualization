import React from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
function ChartPanel({ className, cardOptions, chartOptions }) {
  return (
    <div className={`${className} mb-3`}>
      <Card {...cardOptions}>
        <Chart {...chartOptions} />
      </Card>
    </div>
  );
}

export default ChartPanel;
