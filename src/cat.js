import React, { useState } from "react";

const CatComponent = () => {
  const [catUrl, setCatUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCat = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );
      const data = await response.json();
      console.log(data);
      if (data && data[0].url) {
        setCatUrl(data[0].url);
      } else {
        console.error("No cat pictures found");
      }
    } catch (error) {
      console.error("Error fetching cat pictures", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchCat} disabled={loading}>
        {loading ? "Loading..." : "Get Random Cat"}
      </button>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <img src={catUrl} alt="Random Cat" className="cat-pic" />
      )}
    </div>
  );
};

export default CatComponent;
