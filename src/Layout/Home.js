import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";
import "./Style.css";

function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await listDecks(abortController.signal);
        setDecks(deckResponse);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);

  async function handleDelete(deck) {
    if (
      window.confirm(`Delete this deck? You will not be able to recover it`)
    ) {
      history.go(0);
      return await deleteDeck(deck.id);
    }
  }

  return (
    <div className="container">
      <Link className="btn btn-secondary mb-1" to="/decks/new">
        Create Deck
      </Link>
      <div className="card-deck">
        {decks.map((deck) => {
          return (
            <div className="card" style={{ width: "30rem" }} key={deck.id}>
              <div className="card-body">
                <div className="card-title"><h3>{`${deck.name}`}</h3></div>
                <br />
                <div className="card-subtitle mb-2 text-muted">
                  {`${deck.cards.length} cards`}
                </div>
                <br />
                <div className="card-text">{`${deck.description}`}</div>
                <br />
                <Link
                  className="btn btn-secondary mx-1"
                  to={`/decks/${deck.id}`}
                >
                  View
                </Link>
                <br />
                <br />
                <Link
                  className="btn btn-primary mx-1"
                  to={`/decks/${deck.id}/study`}
                >
                  Study
                </Link>
                <br />
                <br />
                <button
                  type="button"
                  className="btn btn-danger mx-1"
                  onClick={() => handleDelete(deck)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
