import FileUploader from "./components/FileUploader";

function App() {
  return (
    <div className="App overflow-hidden">
      <header className="App-header"></header>
      <main className="bg-gray-900 flex items-center justify-center">
        <FileUploader />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
