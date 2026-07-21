const StatsCard = ({ label, value, subtext }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="text-2xl font-semibold text-white mt-1">{value}</p>
    {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
  </div>
);

export default StatsCard;
