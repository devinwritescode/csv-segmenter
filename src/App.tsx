import FileUploader from "./components/FileUploader";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black min-h-screen flex flex-col justify-center items-center">
        <Header />
        <FileUploader />
        <Footer />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
