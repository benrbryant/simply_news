import "./App.css";
import { NEW_BASEURI, news_categories } from "./utils/data";
import { useState, useEffect } from "react";

function App() {
  let [articles, setArticles] = useState([]);
  let [category, setCategory] = useState("general");

  async function fetchNews(event) {
    let search = document.querySelector("#search").value;
    let res = await fetch(
      `${NEW_BASEURI}${
        search ? "&q=" + search : "&pageSize=5"
      }&category=${category}`
    );
    let data = await res.json();
    console.log(data);
    setArticles(data.articles);
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="App w-100">
      <h1 className="text-center">Simply News</h1>
      <div className="d-flex justify-content-around align-items-center w-sm-50 mx-auto">
        <input
          className="flex-grow w-100"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          onKeyUp={(e) => { if (e.code == "Enter") fetchNews(e)}}
          required
        />
        <span className="text-xxlarge link mx-2">+</span>
        <select
          className="flex-grow w-100"
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {news_categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat} (category)
            </option>
          ))}
        </select>
      </div>
      <div className="my-1 d-flex align-items-center w-sm-50 mx-auto justify-content-center">
        <button className="btn w-sm-25" onClick={fetchNews}>
          Search
        </button>
      </div>
      {articles.length ? (
        <div className="d-flex justify-content-center flex-wrap w-80 mx-auto">
          {articles.map((item, idx) => (
            <div className="card mx-auto" key={item.author + idx}>
              <img
                src={item.urlToImage}
                alt={item.description}
                style={{ maxWidth: "200px" }}
              />
              <a
                className="link"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>{item.title}</h4>
              </a>
              <div className="d-flex justify-content-between"><small className="text-muted">{item.author}</small><small className="text-muted">{item.source.name}</small></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mx-auto text-xxlarge link card">No results</p>
      )}
    </div>
  );
}

export default App;
