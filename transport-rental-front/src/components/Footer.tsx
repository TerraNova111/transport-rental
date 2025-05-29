import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white px-10 pt-28 pb-10 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Лого / Название */}
                <div>
                    <div className="text-2xl font-bold mb-2">TranzEquip</div>
                    <p className="text-gray-400">Аренда спецтехники и транспортных средств по всему Казахстану.</p>
                </div>

                {/* Навигация */}
                <div className="space-y-2">
                    <ul className="space-y-1">
                        <li><Link to="/" className="hover:text-gray-300">Главная</Link></li>
                        <li><Link to="/services" className="hover:text-gray-300">Услуги</Link></li>
                        <li><Link to="/vehicles" className="hover:text-gray-300">Автопарк</Link></li>
                        <li><Link to="/contacts" className="hover:text-gray-300">Контакты</Link></li>
                    </ul>
                </div>

                {/* Контакты */}
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold mb-2">Контакты</h3>
                    <p className="flex items-center gap-2"><Mail className="w-5 h-5" /> info@tranzequip.kz</p>
                    <p className="flex items-center gap-2"><Phone className="w-5 h-5" /> +7 (777) 828-23-66</p>
                    <p className="flex items-center gap-2"><MapPin className="w-5 h-5" /> г. Астана, пр. Мангилик Ел 55</p>
                </div>
            </div>

            <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4 text-sm">
                © {new Date().getFullYear()} TranzEquip. Все права защищены.
            </div>
        </footer>
    );
};

export default Footer;