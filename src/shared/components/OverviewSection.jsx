
import OverviewCard from "./OverviewCard";

// We change the component to accept real data as Props!
const OverviewSection = ({ globalData, loading }) => {
  
  //  If the live data is still loading, we can show a placeholder or dashes
  if (loading) {
    return (
      <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        <OverviewCard title="Market Cap" value="Loading..." change={null} />
        <OverviewCard title="24h Volume" value="Loading..." change={null} />
        <OverviewCard title="BTC Dominance" value="Loading..." change={null} />
      </section>
    );
  }

  //  Once the live data arrives, we inject it dynamically!
  return (
    <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      <OverviewCard 
        title="Market Cap" 
        value={globalData?.marketCap} 
        change={globalData?.marketCapChange} 
      />
      
      <OverviewCard 
        title="24h Volume" 
        value={globalData?.volume} 
        change={globalData?.volumeChange} 
      />
      
      <OverviewCard 
        title="BTC Dominance" 
        value={globalData?.btcDominance} 
        change={globalData?.btcDominanceChange} 
      />
    </section>
  );
};

export default OverviewSection;
