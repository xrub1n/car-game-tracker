import { useState } from "react";
import "./Results.css";

export default function Results({ experiments }) {
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExperiment = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // Calculate total worms and average worms for all Petri dishes in the experiment
  const calculateWorms = (experiment) => {
    const totalWorms = experiment.dishes.reduce((sum, dish) => sum + dish.counts[0] + dish.counts[1],0);
    const totalDishes = experiment.dishes.length;
    const averageWorms = totalDishes === 0 ? 0 : totalWorms / totalDishes;

    return { totalWorms, averageWorms };
  };

  return (
    <div>
      <h2>Results</h2>
      <ul>
        {experiments.map((exp, index) => (
          <li key={index}>
            <button onClick={() => toggleExperiment(index)}>
              {exp.experiment}
            </button>
            <p>Average Worms: {calculateWorms(exp).averageWorms}</p>
            <p>Total Worms: {calculateWorms(exp).totalWorms}</p>
            {expandedIndexes.includes(index) && (
              <ul>
                {exp.dishes.map((dish, dishIndex) => (
                  <li key={dishIndex}>
                    <p class="dish-title">Petri Dish {dish.petriDish}</p>: {dish.labelA}  {dish.counts[0]}, {dish.labelB} {dish.counts[1]}
                    <PieChart counts={dish.counts} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PieChart({ counts }) {
  const total = counts[0] + counts[1];
  const percentA = total === 0 ? 50 : (counts[0] / total) * 100;
  return (
    <div className="pie-chart" style={{
      background: `conic-gradient(#4caf50 0% ${percentA}%, #f44336 ${percentA}% 100%)`
    }}></div>
  );
}
