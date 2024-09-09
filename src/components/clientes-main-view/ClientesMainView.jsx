import { useState, useEffect } from "react";
import ClientCard from "./client-card/ClientCard";
import { fetchData } from "../../../config/fetchData";
import LoadScreen from "../loadScreen/LoadScreen";

export default function ClientsMainView() {
    const [clientList, setClientList] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getClients = async () => {
            try {
                const data = await fetchData("clients-list");
                setClientList(data);
                setFilteredClients(data); // Inicialmente, la lista filtrada es la misma
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getClients();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Filtrar clientes en función del término de búsqueda en múltiples campos
        const filtered = clientList.filter((client) =>
            client.name.toLowerCase().includes(value) ||
            client.celNumber.toLowerCase().includes(value) ||
            client.direccion.toLowerCase().includes(value) ||
            client.description.toLowerCase().includes(value)
        );
        setFilteredClients(filtered);
    };

    if (loading) return <LoadScreen />;
    if (error) return <p>Error al cargar clientes: {error}</p>;

    return (
        <div className="clients-main-container">
            <h2>Lista de Clientes</h2>
            <input
                type="text"
                placeholder="Buscar clientes por nombre, teléfono, dirección o descripción..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input-clients"
            />
            {filteredClients.map((client) => (
                <ClientCard key={client.id} client={client} />
            ))}
        </div>
    );
}
