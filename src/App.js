
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import ThemeChanger from './components/ThemeChanger';
import { useTheme } from './hooks/useTheme';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import Home from './pages/Home/Home';
import Recipe from './pages/Recipe/Recipe';
import SearchPage from './pages/SearchPage/SearchPage';

function App() {

    const { mode } = useTheme()
    return (
        <div className={`App ${mode}`}>
            <BrowserRouter>
                <NavBar />
                <ThemeChanger />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/create">
                        <CreateRecipe />
                    </Route>

                    <Route path='/search'>
                        <SearchPage />
                    </Route>
                    <Route path="/recipes/:id">
                        <Recipe />
                    </Route>
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App
