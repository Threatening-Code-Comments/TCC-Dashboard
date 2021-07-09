import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/Dashboard/QuoteOfTheDay.css";

const QuoteOfTheDay = () => {
  const [quoteData, setQuoteData] = useState(null);

  useEffect(() => {
    if (quoteData) return;

    axios.get("http://quotes.rest/qod").then((response) => {
      try {
        let data = response.data;

        if (data.error) {
          data.contents = {
            quotes: [
              {
                quote: data.error.message,
                author: `HTTP STATUS ${data.error.code}`,
              },
            ],
          };
        }

        setQuoteData(data.contents.quotes[0]);
      } catch (error) {
        throw error;
      }
    });
  });

  if (!quoteData) return null;

  return (
    <div className="quoteOfTheDayContainer">
      <p className="quoteOfTheDay">“{quoteData.quote}”</p>
      <p className="quoteOfTheDayAuthor">- {quoteData.author}</p>
    </div>
  );
};

export default QuoteOfTheDay;
