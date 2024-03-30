import { React, useState } from "react";

const DogComponent = () => {
  const [commentState, setCommentState] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [dogUrl, setDogUrl] = useState("");

  const handleInput = (event) => {
    event.preventDefault();
    setComment(event.target.value);
    console.log(comment);
  };

  const addComment = () => {
    if (comment.trim() !== "") {
      setCommentList([...commentList, comment]);
      setComment("");
      console.log(commentList);
    }
  };

  const fetchDog = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      console.log(data);
      if (data && data.message) {
        setDogUrl(data.message);
      } else {
        console.error("No Dogs found");
      }
    } catch (error) {
      console.error("Error fetching Dogs", error);
    }
  };

  return (
    <div className="container-fetch">
      <img src={dogUrl} alt="Random Dog" className="dog-pic" />
      <div className="btn-container">
        <button onClick={fetchDog} className="btn-dog">
          Get Random Dog
        </button>
        <div>
          <button
            onClick={() => setCommentState(!commentState)}
            className="btn-comment"
          >
            Comment
          </button>
        </div>
      </div>
      {commentState ? (
        <input
          className="comment-box"
          placeholder="Add Comment"
          value={comment}
          onChange={(event) => handleInput(event)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addComment();
            }
          }}
        />
      ) : (
        ""
      )}
      {commentList.map((item, index) => (
        <div>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default DogComponent;
