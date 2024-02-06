import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";

import Deck from "../Deck/Deck";
import CreateDeck from "../Deck/CreateDeck";
import EditDeck from "../Deck/EditDeck";

import AddCard from "../Card/AddCard";
import EditCard from "../Card/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home className="btn btn-secondary" />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
