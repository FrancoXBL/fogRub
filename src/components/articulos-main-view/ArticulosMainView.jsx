import { useState, useEffect } from "react";
import ArticuloCard from "./articulo-card/ArticuloCard";
import { fetchData } from "../../../config/fetchData";
import LoadScreen from "../loadScreen/LoadScreen";

export default function ArticulosMainView() {
    const [articleList, setArticleList] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const data = await fetchData("articles-list");
                setArticleList(data);
                setFilteredArticles(data); // Inicialmente, la lista filtrada es la misma
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getArticles();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Filtrar artículos en función del término de búsqueda
        const filtered = articleList.filter((article) =>
            article.name.toLowerCase().includes(value) ||
            article.code.toLowerCase().includes(value) ||
            article.price.toLowerCase().includes(value)
        );
        setFilteredArticles(filtered);
    };

    if (loading) return <LoadScreen />;
    if (error) return <p>Error al cargar artículos: {error}</p>;

    return (
        <div className="articulos-main-container">
            <h2>Lista de Artículos</h2>
            <input
                type="text"
                placeholder="Buscar artículos por nombre, código, descripción o categoría..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input-articles"
            />
            {filteredArticles.map((article) => (
                <ArticuloCard key={article.id} article={article} />
            ))}
        </div>
    );
}
