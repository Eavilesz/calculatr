import { useState } from 'react';
import { calculations } from './calculations.js';

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const calc = calculations.find((c) => c.id === selectedId);

  return (
    <div className="app">
      {calc ? (
        <Calculator key={calc.id} calc={calc} onBack={() => setSelectedId(null)} />
      ) : (
        <Home onSelect={setSelectedId} />
      )}
    </div>
  );
}

function Home({ onSelect }) {
  return (
    <>
      <header className="header">
        <h1>Calculatr</h1>
      </header>
      <ul className="list">
        {calculations.map((c) => (
          <li key={c.id}>
            <button className="card" onClick={() => onSelect(c.id)}>
              <span className="card-title">{c.title}</span>
              <span className="card-desc">{c.description}</span>
              <span className="chevron" aria-hidden>›</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function Calculator({ calc, onBack }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(calc.inputs.map((i) => [i.key, '']))
  );
  const parsed = Object.fromEntries(
    Object.entries(values).map(([k, v]) => [k, Number(v.replace(/,/g, '').trim() || NaN)])
  );
  const isValid = Object.values(parsed).every((n) => Number.isFinite(n));
  const result = isValid ? calc.compute(parsed) : null;

  function handleSubmit(e) {
    e.preventDefault();
    document.activeElement?.blur(); // "Go" on the iOS keyboard just dismisses it
  }

  function handleChange(key, value) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  return (
    <>
      <header className="header">
        <button className="back" onClick={onBack} aria-label="Back">‹ Back</button>
        <h1>{calc.title}</h1>
        <p className="subtitle">{calc.description}</p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        {calc.inputs.map((input, idx) => (
          <label key={input.key} className="field">
            <span className="field-label">{input.label}</span>
            <span className="input-wrap">
              {input.prefix && <span className="prefix">{input.prefix}</span>}
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="0.00"
                autoFocus={idx === 0}
                value={values[input.key]}
                onChange={(e) => handleChange(input.key, e.target.value)}
              />
            </span>
          </label>
        ))}
      </form>

      <section className="result" aria-live="polite">
        <span className="result-label">{calc.resultLabel}</span>
        <span className={`result-value${result === null ? ' empty' : ''}`}>
          {result === null ? '—' : calc.format(result)}
        </span>
      </section>
    </>
  );
}
