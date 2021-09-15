import "./App.css";
import Row from "./components/Row";
import requests from "./configuration/requests";
import Banner from "./components/Banner";
import NavBar from "./components/NavBar";

const ROW_DATA = [
  {
    id: 1,
    title: "NETFLIX ORIGINALS",
    request: requests.fetchNetflixOriginals,
  },
  { id: 2, title: "Trending Now", request: requests.fetchTrending },
  { id: 3, title: "Top Rated", request: requests.fetchTopRated },
  { id: 4, title: "Action Movies", request: requests.fetchActionMovies },
  { id: 5, title: "Comedy Movies", request: requests.fetchComdedyMovies },
  { id: 6, title: "Horror Movies", request: requests.fetchHorrorMovies },
  { id: 7, title: "Romance Movies", request: requests.fetchRomanceMovies },
  { id: 8, title: "Documentaries", request: requests.fetchDocumentaries },
];

function App() {
  return (
    <div className="app">
      <NavBar />
      <Banner request={ROW_DATA[0]["request"]} />
      {ROW_DATA.map((row) => (
        <Row
          key={row.id}
          title={row.title}
          request={row.request}
          originals={row.title === "NETFLIX ORIGINALS" ? true : false}
        />
      ))}
    </div>
  );
}

export default App;
