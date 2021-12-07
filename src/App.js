import React from "react";
import { Salestable } from "./components/sales/Salestable.js";
import { ModalForm } from "./components/modalform/ModalForm.js";
import "./App.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { selectGrafMassive } from "./utils/mainAppSlice";

function App() {
  const data = useSelector(selectGrafMassive);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="container">
        <ResponsiveContainer height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              type="monotone"
              dataKey="value"
              label="Date"
              stroke="#ff7300"
              yAxisId={0}
            />
          </LineChart>
        </ResponsiveContainer>
        <Salestable />
        <ModalForm />
      </div>
    </div>
  );
}

export default App;
