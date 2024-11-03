// SearchFilter.jsx

const SearchFilter = ({ setData }) => {
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setData((prevData) =>
      prevData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(query)
        )
      )
    );
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      className="p-2 border rounded mb-4 w-full"
      aria-label="Search through CRM data"
    />
  );
};

export default SearchFilter;
