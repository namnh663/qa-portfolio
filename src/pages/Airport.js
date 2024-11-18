import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
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
  });

  const calculateDistance = async () => {
    try {
      const res = await fetch('https://airportgap.com/api/airports/distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `from=${fromAirport}&to=${toAirport}`,
      });
      const data = await res.json();
      setDistance(data.data.attributes);
    } catch (error) {
      console.error('Failed to calculate distance:', error);
    }
  };

  const filteredAirports = airportsResponse?.data.filter(airport =>
    airport.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.attributes.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.attributes.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.attributes.iata.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Airport Data Management</h1>
          <input
            type="text"
            id="airport-search"
            name="airport-search"
            placeholder="Search airports..."
            className="mt-4 md:mt-0 px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Welcome to the Airport Data Platform. This interactive tool helps QA engineers and developers test API integrations using the AirportGap API service. You can experiment with airport data retrieval, distance calculations, and explore the comprehensive dataset.
          </p>
          <div className="mt-4">
            <a 
              href="https://airportgap.com/docs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View API Documentation →
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-xl font-bold mb-4">Distance Calculator</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <select
                  id="from-airport"
                  name="from-airport"
                  value={fromAirport}
                  onChange={(e) => setFromAirport(e.target.value)}
                  className="p-2 rounded-lg dark:bg-gray-800 dark:text-white"
                >
                  <option value="">From Airport</option>
                  {airportsResponse?.data.map((airport) => (
                    <option key={airport.id} value={airport.attributes.iata}>
                      {airport.attributes.iata} - {airport.attributes.city}
                    </option>
                  ))}
                </select>
                <select
                  id="to-airport"
                  name="to-airport"
                  value={toAirport}
                  onChange={(e) => setToAirport(e.target.value)}
                  className="p-2 rounded-lg dark:bg-gray-800 dark:text-white"
                >
                  <option value="">To Airport</option>
                  {airportsResponse?.data.map((airport) => (
                    <option key={airport.id} value={airport.attributes.iata}>
                      {airport.attributes.iata} - {airport.attributes.city}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                onClick={calculateDistance}
                disabled={!fromAirport || !toAirport}
              >
                Calculate Distance
              </Button>
              {distance && (
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Miles</div>
                    <div className="text-xl font-bold">{distance.miles.toFixed(2)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Kilometers</div>
                    <div className="text-xl font-bold">{distance.kilometers.toFixed(2)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Nautical Miles</div>
                    <div className="text-xl font-bold">{distance.nautical_miles.toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Airports</div>
                <div className="text-2xl font-bold">
                  {airportsResponse?.data.length || 0}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                <div className="text-2xl font-bold">
                  {new Set(airportsResponse?.data.map(a => a.attributes.country)).size || 0}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Card>
            <h2 className="text-xl font-bold mb-4">Airports Directory</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="text-left">
                    <th className="p-4 whitespace-nowrap">IATA</th>
                    <th className="p-4 whitespace-nowrap">Name</th>
                    <th className="p-4 whitespace-nowrap">City</th>
                    <th className="p-4 whitespace-nowrap">Country</th>
                    <th className="p-4 whitespace-nowrap">Coordinates</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAirports?.map((airport) => (
                    <tr key={airport.id} className="border-t">
                      <td className="p-4 whitespace-nowrap">{airport.attributes.iata}</td>
                      <td className="p-4">{airport.attributes.name}</td>
                      <td className="p-4 whitespace-nowrap">{airport.attributes.city}</td>
                      <td className="p-4 whitespace-nowrap">{airport.attributes.country}</td>
                      <td className="p-4 whitespace-nowrap">
                        {airport.attributes.latitude}, {airport.attributes.longitude}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <Button
                onClick={() => setPage(page => Math.max(1, page - 1))}
                disabled={page === 1}
                variant="default"
              >
                Previous
              </Button>
              <span className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                Page {page}
              </span>
              <Button
                onClick={() => setPage(page => page + 1)}
                disabled={!airportsResponse?.data.length}
                variant="default"
              >
                Next
              </Button>
            </div>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function Airport() {
  return (
    <QueryClientProvider client={queryClient}>
      <AirportDashboard />
    </QueryClientProvider>
  );
}