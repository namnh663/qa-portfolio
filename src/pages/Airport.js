import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input'; // <-- Assuming you have this from our previous redesigns
import LoadingSpinner from '../components/common/LoadingSpinner';
import Footer from '../components/common/Footer';

const queryClient = new QueryClient();

function AirportDashboard() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');
  const [distance, setDistance] = useState(null);

  const { data: airportsResponse, isLoading } = useQuery({
    queryKey: ['airports', page],
    queryFn: async () => {
      const res = await fetch(`https://airportgap.com/api/airports?page=${page}`);
      if (!res.ok) throw new Error('Failed to fetch airports');
      return res.json();
    },
    // keepPreviousData: true, // (Optional: nice for pagination)
  });

  const calculateDistance = async () => {
    try {
      const res = await fetch('https://airportgap.com/api/airports/distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // Use the state variables for IATA codes
        body: `from=${fromAirport}&to=${toAirport}`,
      });
      const data = await res.json();
      setDistance(data.data.attributes);
    } catch (error) {
      console.error('Failed to calculate distance:', error);
    }
  };

  // Filter logic remains the same
  const filteredAirports = airportsResponse?.data.filter(airport =>
    airport.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.attributes.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.attributes.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.attributes.iata.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-6 py-8">
        {/* 1. Page Header is simpler */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Airport Data Management
          </h1>
        </div>

        {/* 2. Modern Dashboard Layout (Sidebar + Main) */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">

          {/* === SIDEBAR (Tools) === */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6 mb-6 lg:mb-0">
            {/* 3. FIXED Distance Calculator */}
            <Card>
              <Card.Header>
                <Card.Title>Distance Calculator</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                {/* *** CRITICAL UX FIX ***
                  Replaced unusable <select> with <Input>.
                  Devs/QA know the IATA codes they want to test.
                */}
                <div>
                  <label htmlFor="from-airport" className="block text-sm font-medium mb-1">
                    From (IATA)
                  </label>
                  <Input
                    type="text"
                    id="from-airport"
                    name="from-airport"
                    placeholder="e.g., SFO"
                    value={fromAirport}
                    onChange={(e) => setFromAirport(e.target.value.toUpperCase())}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="to-airport" className="block text-sm font-medium mb-1">
                    To (IATA)
                  </label>
                  <Input
                    type="text"
                    id="to-airport"
                    name="to-airport"
                    placeholder="e.g., JFK"
                    value={toAirport}
                    onChange={(e) => setToAirport(e.target.value.toUpperCase())}
                    className="w-full"
                  />
                </div>
              </Card.Content>
              <Card.Footer>
                <Button
                  onClick={calculateDistance}
                  disabled={!fromAirport || !toAirport}
                  className="w-full" // Make button full-width
                >
                  Calculate Distance
                </Button>
              </Card.Footer>

              {distance && (
                <Card.Content>
                  <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">mi</div>
                      <div className="text-xl font-bold">{distance.miles.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">km</div>
                      <div className="text-xl font-bold">{distance.kilometers.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">nmi</div>
                      <div className="text-xl font-bold">{distance.nautical_miles.toFixed(2)}</div>
                    </div>
                  </div>
                </Card.Content>
              )}
            </Card>

            {/* Overview Card */}
            <Card>
              <Card.Header>
                <Card.Title>Overview (Current Page)</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                {/* 4. Simplified stat blocks */}
                <div className="p-4 rounded-lg border dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Airports</div>
                  <div className="text-2xl font-bold">
                    {airportsResponse?.data.length || 0}
                  </div>
                </div>
                <div className="p-4 rounded-lg border dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                  <div className="text-2xl font-bold">
                    {new Set(airportsResponse?.data.map(a => a.attributes.country)).size || 0}
                  </div>
                </div>
              </Card.Content>
            </Card>
          </aside>

          {/* === MAIN CONTENT (Data) === */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* 5. Welcome/Intro moved into a Card */}
            <Card>
              <Card.Header>
                <Card.Title>Welcome to the AirportGap Test Tool</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  This interactive tool helps QA engineers and developers test API integrations. 
                  Experiment with airport data retrieval, distance calculations, and more.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://airportgap.com/docs" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    View API Documentation →
                  </a>
                </div>
              </Card.Content>
            </Card>
            
            {/* Main Airport Directory */}
            {isLoading && !airportsResponse ? ( // Show spinner only on initial load
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : (
              <Card>
                <Card.Header>
                  <Card.Title>Airports Directory</Card.Title>
                  {/* 6. CONTEXTUAL SEARCH: Moved search bar here */}
                  <Input
                    type="text"
                    id="airport-search"
                    name="airport-search"
                    placeholder="Search current page..."
                    className="w-full md:w-64" // Responsive width
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Card.Header>
                <Card.Content className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]" role="table">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr className="text-left">
                          <th className="p-4 whitespace-nowrap text-sm font-semibold">IATA</th>
                          <th className="p-4 whitespace-nowrap text-sm font-semibold">Name</th>
                          <th className="p-4 whitespace-nowrap text-sm font-semibold">City</th>
                          <th className="p-4 whitespace-nowrap text-sm font-semibold">Country</th>
                          <th className="p-4 whitespace-nowrap text-sm font-semibold">Coordinates</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAirports?.map((airport) => (
                          <tr key={airport.id} className="border-t dark:border-gray-700">
                            <td className="p-4 whitespace-nowrap text-sm">{airport.attributes.iata}</td>
                            <td className="p-4 text-sm">{airport.attributes.name}</td>
                            <td className="p-4 whitespace-nowrap text-sm">{airport.attributes.city}</td>
                            <td className="p-4 whitespace-nowrap text-sm">{airport.attributes.country}</td>
                            <td className="p-4 whitespace-nowrap text-sm">
                              {airport.attributes.latitude}, {airport.attributes.longitude}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Content>
                {/* 7. Pagination moved to Footer */}
                <Card.Footer className="flex justify-center items-center gap-2">
                  <Button
                    onClick={() => setPage(page => Math.max(1, page - 1))}
                    disabled={page === 1}
                    variant="outline" // Lighter style
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 py-2 text-sm font-medium">
                    Page {page}
                  </span>
                  <Button
                    onClick={() => setPage(page => page + 1)}
                    disabled={!airportsResponse?.data.length}
                    variant="outline" // Lighter style
                  >
                    Next
                  </Button>
                </Card.Footer>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Full wrapper component remains the same
export default function Airport() {
  return (
    <QueryClientProvider client={queryClient}>
      <AirportDashboard />
    </QueryClientProvider>
  );
}