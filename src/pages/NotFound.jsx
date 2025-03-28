import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl text-gray-800 mt-2">Oops! Page Not Found</p>
            <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>

            <Link to="/" className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
