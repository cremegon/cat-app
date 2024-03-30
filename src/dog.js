import { React, useState } from "react";
import { auth } from '../src/firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'

const DogComponent = () => {
  const [commentState, setCommentState] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [dogUrl, setDogUrl] = useState("");

  const navigate = useNavigate();

  const handleLogout = async() => {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
  }

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
    setCommentList([])
  };

  return (
    <div className="container-fetch">
      <button onClick={handleLogout} className="btn-logout">Logout</button>
      <h1>Random Dog Pictures</h1>
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
