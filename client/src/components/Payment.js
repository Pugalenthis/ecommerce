import axios from "axios";
import { useEffect, useState } from "react";
import "./payment.css";

function Payment() {
  const [book, setBook] = useState({
    name: "The Fault In Our Stars",
    author: "John Green",
    img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
    price: 250,
  });

  // useEffect(() => {
  //   handlePayment();
  // }, []);

  return (
    <div className="Payment">
      <div className="book_container">
        <img src={book.img} alt="book_img" className="book_img" />
        <p className="book_name">{book.name}</p>
        <p className="book_author">By {book.author}</p>
        <p className="book_price">
          Price : <span>&#x20B9; {book.price}</span>
        </p>
        {/* <button onClick={handlePayment} className="buy_btn">
          buy now
        </button> */}
      </div>
    </div>
  );
}

export default Payment;
