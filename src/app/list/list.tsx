import { useSearchParams } from 'next/navigation';

const ListPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('search'); // Safely access 'get'

  return (
    <div>
      <h1>Search Results</h1>
      {searchQuery ? (
        <p>You searched for: <b>{searchQuery}</b></p>
      ) : (
        <p>No search query provided.</p>
      )}
    </div>
  );
};

export default ListPage;
