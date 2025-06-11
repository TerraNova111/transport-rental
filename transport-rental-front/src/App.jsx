import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import './styles/index.css'
import Header from "./components/Header.js";
import ProfilePage from "./pages/ProfilePage.tsx";
import Footer from "./components/Footer.js";
import AdminPanelPage from "./pages/AdminPanelPage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import CatalogPage from "./pages/CatalogPage.tsx";
import VehiclePage from "./pages/VehiclePage.js";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage.tsx";
import CatalogHomePage from "./pages/CatalogHomePage.js";
import PaymentCancel from "./pages/payment/PaymentCancel.js";


export default function App() {
    return (
            <div className="min-h-screen ">
                <Header/>

                <main className="">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/profile"
                               element={
                                   <ProtectedRoute>
                                       <ProfilePage/>
                                   </ProtectedRoute>
                               }
                        />
                        <Route path="/admin"
                               element={
                                   <ProtectedRoute>
                                       <AdminPanelPage/>
                                   </ProtectedRoute>
                               }
                        />
                        <Route path="/catalog" element={<CatalogHomePage />} />
                        <Route path="/catalog/:serviceCategory" element={<CatalogPage />} />
                        <Route path="/catalog/:serviceCategory/:category" element={<CatalogPage />} />

                        <Route path="/vehicle/:id" element={<VehiclePage/>}/>
                        <Route path="/payment-success"
                               element={
                                   <ProtectedRoute>
                                       <PaymentSuccessPage />
                                   </ProtectedRoute>
                            }
                        />
                        <Route path="/payment-cancel"
                               element={
                                   <ProtectedRoute>
                                       <PaymentCancel />
                                   </ProtectedRoute>
                               }
                        />
                    </Routes>
                </main>

                <Footer/>
            </div>
    )

}