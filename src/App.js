import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { saveAs } from "file-saver";

function App() {
  const [query, setQuery] = useState("nature");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(7);

  const getImages = async () => {
    await axios
      .get(
        `https://api.pexels.com/v1/search?query=${query}&orientation=landscape&size=medium`,
        {
          headers: {
            Authorization: `jUeC6EnmP3bSLZVPFuLzitXzS0kH0aT46zTSrrxT4bSKcG41TDJ4mMMG`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        // console.log(res.data.photos);
        return setImages(res.data.photos);
      });
  };

  const handleSearch = () => {
    setLoading(true);
    getImages();
  };

  const handlePrev = () => {
    setLow((e) => Math.max(0, e - 8));
    setHigh((e) => Math.max(7, e - 8));
  };

  const handleNext = () => {
    setLow((e) => Math.min(images.length - 9, e + 8));
    setHigh((e) => Math.min(images.length - 1, e + 8));
  };

  function download(url, name) {
    saveAs(url, name);
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="App bg-light">
      <nav
        className="row border-bottom p-3 mb-5 fixed-top"
        style={{ background: "white" }}
      >
        <div className="col-md-6 d-flex justify-content-start">
          <img
            src="https://asset.brandfetch.io/idUIh6k_cy/idQgJhGfSi.png"
            style={{ height: "40px" }}
          />
        </div>
        <div className="col-md-6 d-flex">
          <input
            placeholder="Search for free photos"
            className="form-control rounded-0 me-0"
            onChange={(e) =>
              setQuery(e.target.value ? e.target.value : "nature")
            }
            style={{ width: "20rem" }}
            type="search"
          />
          <button className="custom-btn px-4" onClick={() => handleSearch()}>
            Search
          </button>
        </div>
      </nav>
      <div className="p-3 mt-5 pt-5">
        {loading ? (
          <div>
            <h3>Loading images...</h3>
            <div className="spinner-border text-success" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <div className="row m-0">
            {images
              .filter((_, index) => index >= low && index <= high)
              .map((image, index) => (
                <div className="container col-sm-6 col-md-3 p-2">
                  <img
                    src={image.src.large}
                    style={{
                      width: "100%",
                      height: "16rem",
                    }}
                    className="rounded-0"
                  />
                  <div className="overlay">
                    <p className="fs-5">{image.alt}</p>
                    <p>by {image.photographer}</p>
                    <button
                      className="custom-btn py-2 px-3"
                      onClick={() => download(image.src.large2x, image.alt)}
                    >
                      Download <i className="fa fa-download"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
        <div className="mt-5">
          <button
            className="custom-btn py-2 px-4 me-1"
            onClick={() => handlePrev()}
          >
            &lt;&lt; Prev
          </button>
          <button className="custom-btn py-2 px-4" onClick={() => handleNext()}>
            Next &gt;&gt;
          </button>
        </div>
      </div>

      <footer className="p-3 text-center">
        Copywright © Akash Sardar, 2023
      </footer>
    </div>
  );
}

export default App;
