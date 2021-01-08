import { Switch, Route } from "react-router-dom";
import AlbumList from "./album-list/album-list.component";
import AlbumPage from "./album-page/album-page.component";
import "./App.css";

function App() {
  return (
    <main className="app">
      <Switch>
        <Route path="/album/:id" exact component={AlbumPage} />
        <Route path="/" exact component={AlbumList} />
      </Switch>
    </main>
  );
}

export default App;
