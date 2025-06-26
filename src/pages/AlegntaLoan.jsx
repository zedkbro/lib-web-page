import Header from "../components/alegnta/Header";
import DownloadButtons from "../components/alegnta/DownloadButtons";
import Footer from "../components/alegnta/Footer";

const AlegntaLoan = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow flex flex-col items-center text-center px-4">
                <DownloadButtons />
            </main>
            <Footer />
        </div>
    );
};

export default AlegntaLoan;
