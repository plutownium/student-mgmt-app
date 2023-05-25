import "./App.css";
import PageRoutes from "./routes/routes";
import NotificationsProvider from "./context/NotificationsContext";

function App() {
    return (
        <div className="App">
            <NotificationsProvider>
                <PageRoutes />;
            </NotificationsProvider>
        </div>
    );
}

export default App;
