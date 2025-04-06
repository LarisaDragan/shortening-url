import { useState } from "react";
import "./ShortenComponent.css";

const ShortenComp = () => {
  const [urlToShort, setUrlToShort] = useState("");
  const [sortedUrl, setShortedUrl] = useState([]);
  const [copied, setCopied] = useState({ isCopied: false, index: null });
  const [error, setError] = useState("");

  const handleOnClick = async (e) => {
    e.preventDefault();

    if (!urlToShort.trim()) {
      setError("Please add a link");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToShort }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten the URL");
      }

      const data = await response.json();

      setShortedUrl((prev) => [
        ...prev,
        { originalUrl: urlToShort, shortedUrl: data.short_url },
      ]);
      setUrlToShort("");
      setError(null);
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  const handleCopy = (shortenedUrl, index) => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied({ isCopied: true, index });

    setTimeout(() => {
      setCopied({ isCopied: false, index: null });
    }, 2000);
  };

  return (
    <>
      <form id="form">
        <div>
          <input
            type="text"
            placeholder="Shorten a link here..."
            value={urlToShort}
            onChange={(e) => setUrlToShort(e.target.value)}
          />
          <button onClick={handleOnClick}>Shorten it!</button>
        </div>
        <div>{error && <p>{error}</p>}</div>
      </form>

      <div className="shortened">
        {sortedUrl &&
          sortedUrl.map((url, index) => {
            return (
              <div key={index} className="display-urls">
                <span>{url.originalUrl}</span>
                <div>
                  <span>{url.shortedUrl}</span>
                </div>
                <button onClick={() => handleCopy(url.shortedUrl, index)}>
                  {copied.isCopied === true && copied.index === index
                    ? "Copied"
                    : "Copy"}
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ShortenComp;
