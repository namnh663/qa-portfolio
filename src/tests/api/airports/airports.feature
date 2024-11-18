Feature: Airport API Tests

Background:
  * url 'https://airportgap.com/api'

Scenario: Get airports list with pagination
  Given path '/airports'
  And param page = 1
  When method GET
  Then status 200
  And match each response.data[*].attributes contains 
  """
  {
    iata: '#string',
    name: '#string',
    city: '#string',
    country: '#string',
    icao: '#string',
    latitude: '#string',
    longitude: '#string',
    altitude: '#number',
    timezone: '#string'
  }
  """

Scenario: Verify pagination works correctly
  Given path '/airports'
  And param page = 2
  When method GET
  Then status 200
  And match response.data != '#[0]'

Scenario Outline: Get airport details by ID
  Given path '/airports/<airportId>'
  When method GET
  Then status 200
  And match response.data.attributes contains 
  """
  {
    iata: '#string',
    name: '#string',
    city: '#string',
    country: '#string',
    icao: '#string',
    latitude: '#string',
    longitude: '#string',
    altitude: '#number',
    timezone: '#string'
  }
  """

  Examples:
    | airportId |
    | KIX       |
    | JFK       |
    | LAX       |

Scenario Outline: Calculate distance between airports
  Given path '/airports/distance'
  And header Content-Type = 'application/x-www-form-urlencoded'
  And form field from = '<fromAirport>'
  And form field to = '<toAirport>'
  When method POST
  Then status 200
  And match response.data.attributes contains { miles: '#number', kilometers: '#number', nautical_miles: '#number' }

  Examples:
    | fromAirport | toAirport |
    | JFK        | LAX       |
    | SFO        | ORD       |
    | LHR        | CDG       |
    | SYD        | MEL       |

Scenario: Verify error handling for invalid airport codes
  Given path '/airports/distance'
  And header Content-Type = 'application/x-www-form-urlencoded'
  And form field from = 'XXX'
  And form field to = 'YYY'
  When method POST
  Then status 422
  And match response.errors[0] contains 
  """
  {
    status: '422',
    title: 'Unable to process request',
    detail: 'Please enter valid \'from\' and \'to\' airports.'
  }
  """