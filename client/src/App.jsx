import AssignmentList from "./pages/AssignmentList";
import "./styles/main.scss";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>CipherSQLStudio</h1>
        <p>Practice SQL like a pro — Easy to Advanced</p>
      </header>

      <AssignmentList />
    </div>
  );
}
