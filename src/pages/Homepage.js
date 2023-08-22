import React, { useEffect, useState } from "react";
import ChartPanel from "../components/ChartPanel";
import DataBox from "../components/DataBox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function Homepage() {
  const [data, setData] = useState({});
  const [stateData, setStateData] = useState();
  useEffect(() => {
    fetch("https://mocki.io/v1/b2ac46d3-385d-448a-a77a-9bc2c5b5dcbc")
      .then((res) => res.json())
      .then(({ data }) => {
        const termVariations = ["new cases", "recoveries", "deaths"];

        const stateCounts = {};

        data.forEach((update) => {
          const sentences = update.update
            .split("\n")
            .filter((sentence) => sentence.trim() !== "");

          sentences.forEach((sentence) => {
            termVariations.forEach((term) => {
              const termSingular = term.replace(/(ies|es|s)$/, ""); // Remove "es" or "s" to get the singular form
              const termRegex = new RegExp(`(\\d+)\\s+${termSingular}`, "gi");
              const termMatches = sentence.match(termRegex);

              if (termMatches) {
                termMatches.forEach((match) => {
                  const [count] = match.match(/(\d+)/);
                  const locationPattern = /in ([^(.]+)/;
                  const locationMatch = sentence.match(locationPattern);
                  if (locationMatch) {
                    const state = locationMatch[1].trim(); // Trim the state name
                    if (!stateCounts[state]) {
                      stateCounts[state] = {
                        "new cases": 0,
                        recoveries: 0,
                        deaths: 0,
                      };
                    }
                    stateCounts[state][term] += parseInt(count, 10);
                  }
                });
              }
            });
          });
        });

        setData(stateCounts);
        const convertedData = Object.entries(stateCounts).map(
          ([state, values]) => ({
            state,
            ...values,
          })
        );
        setStateData(convertedData);
      });
  }, []);
  const colors = [
    "rgba(255, 0, 0, 0.7)",
    "rgba(0, 255, 0, 0.7)",
    "rgba(0, 0, 255, 0.7)",
    "rgba(255, 255, 0, 0.7)",
    "rgba(255, 0, 255, 0.7)",
    "rgba(0, 255, 255, 0.7)",
    "rgba(128, 0, 0, 0.7)",
    "rgba(0, 128, 0, 0.7)",
    "rgba(0, 0, 128, 0.7)",
    "rgba(128, 128, 0, 0.7)",
    "rgba(128, 0, 128, 0.7)",
    "rgba(0, 128, 128, 0.7)",
    "rgba(255, 128, 0, 0.7)",
    "rgba(255, 0, 128, 0.7)",
    "rgba(128, 255, 0, 0.7)",
    "rgba(0, 255, 128, 0.7)",
    "rgba(128, 0, 255, 0.7)",
    "rgba(255, 128, 128, 0.7)",
    "rgba(128, 255, 255, 0.7)",
    "rgba(255, 255, 128, 0.7)",
    "rgba(128, 128, 255, 0.7)",
    "rgba(192, 192, 192, 0.7)",
    "rgba(128, 128, 128, 0.7)",
    "rgba(64, 64, 64, 0.7)",
    "rgba(255, 165, 0, 0.7)",
    "rgba(0, 128, 64, 0.7)",
    "rgba(139, 69, 19, 0.7)",
    "rgba(148, 0, 211, 0.7)",
    "rgba(0, 0, 0, 0.7)",
  ];

  const labels = Object.keys(data);
  const newCases = Object.values(data).map((entry) => entry["new cases"]);
  const recoveries = Object.values(data).map((entry) => entry["recoveries"]);
  const deaths = Object.values(data).map((entry) => entry["deaths"]);
  return (
    <div className=" p-4">
      <h1 className="text-500 text-center mb-5">COVID Data Visualizer</h1>
      <div className="grid gap-3 mb-3 justify-content-center">
        <DataBox
          className="col-12 md:col-3"
          title="Total New Cases"
          count={newCases.reduce((sum, a) => {
            return sum + a;
          }, 0)}
          countColor="text-orange-500"
        />
        <DataBox
          className="col-12 md:col-3"
          title="Total Recoveries"
          count={recoveries.reduce((sum, a) => {
            return sum + a;
          }, 0)}
          countColor="text-green-500"
        />
        <DataBox
          className="col-12 md:col-3"
          title="Total Deaths"
          count={deaths.reduce((sum, a) => {
            return sum + a;
          }, 0)}
          countColor="text-red-500"
        />
      </div>
      <div className="grid gap">
        <ChartPanel
          className="col-12 md:col-6 mb-3"
          cardOptions={{
            title: "State-wise new cases",
          }}
          chartOptions={{
            type: "pie",
            data: {
              labels: labels,
              datasets: [
                {
                  data: newCases,
                  backgroundColor: colors,
                },
              ],
            },
          }}
        />
        <ChartPanel
          className="col-12 md:col-6 mb-3"
          cardOptions={{
            title: "State-wise recoveries",
          }}
          chartOptions={{
            type: "pie",
            data: {
              labels: labels,
              datasets: [
                {
                  data: recoveries,
                  backgroundColor: colors,
                },
              ],
            },
          }}
        />
        <ChartPanel
          className="col-12 md:col-6 mb-3"
          cardOptions={{
            title: "State-wise deaths",
          }}
          chartOptions={{
            type: "pie",
            data: {
              labels: labels,
              datasets: [
                {
                  data: deaths,
                  backgroundColor: colors,
                },
              ],
            },
          }}
        />
      </div>

      <DataTable value={stateData} header="COVID Statistics Data" sor>
        <Column field="state" header="State"></Column>
        <Column field="new cases" header="New cases"></Column>
        <Column field="recoveries" header="Recoveries"></Column>
        <Column field="deaths" header="Deaths"></Column>
      </DataTable>
    </div>
  );
}

export default Homepage;
