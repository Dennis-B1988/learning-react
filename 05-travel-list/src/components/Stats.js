function Stats({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">
        <em>You have nothing on your list. Add an item!</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentPacked = Math.round((numPacked / numItems) * 100) || 0;

  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? 'You got everything! Ready to go ✈️'
          : `You have ${numItems} items on your List, and you already packed ${numPacked} (${percentPacked}%)`}
      </em>
    </footer>
  );
}

export default Stats;
