import Navbar from "../components/global/Navbar";

export default function MainContainer({ children  }) {
    return (
        <>
            <div className="min-h-full font-sans">
                <Navbar/>
                { children }
            </div>
        </>
    );
}