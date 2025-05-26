export default function Controls({ onReset, onDone, onDeleteDish }) {
    return (
      <div className="control-buttons">
        <button onClick={onReset}>Reset Counts</button>
        <button onClick={onDone}>Done</button>
        <button onClick={onDeleteDish}>Delete Petri Dish</button>
      </div>
    );
  }