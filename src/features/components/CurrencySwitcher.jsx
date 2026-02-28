const CurrencySwitcher = ({ currency, setCurrency }) => {

  const currencies = [
    { code: "usd", label: "USD" },
    { code: "inr", label: "INR" },
    { code: "eur", label: "EUR" },
  ];

  return (
    <div className="flex gap-3">
      {currencies.map((cur) => (
        <button
          key={cur.code}
          onClick={() => setCurrency(cur.code)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${
              currency === cur.code
                ? "bg-white text-black shadow-md"
                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
            }`}
        >
          {cur.label}
        </button>
      ))}
    </div>
  );
};

export default CurrencySwitcher;