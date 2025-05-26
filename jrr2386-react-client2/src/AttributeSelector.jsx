export default function AttributeSelector({ selectedAttribute, onChange }) {
    return (
      <select value={selectedAttribute} onChange={e => onChange(e.target.value)}>
        <option value="maturity">Maturity</option>
        <option value="sex">Sex</option>
        <option value="coordination">Coordination</option>
        <option value="mutant">Mutant</option>
      </select>
    );
  }
  