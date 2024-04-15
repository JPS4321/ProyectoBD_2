import React, { useState, useEffect } from "react";

const Reportes = () => {
    const [fechaInicio, setFechaInicio] = useState(localStorage.getItem("fechaInicio") || '');
    const [fechaFin, setFechaFin] = useState(localStorage.getItem("fechaFin") || '');
    const [reportType, setReportType] = useState('1');
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        localStorage.setItem("fechaInicio", fechaInicio);
        localStorage.setItem("fechaFin", fechaFin);
    }, [fechaInicio, fechaFin]);

    const handleFetchReport = () => {
        fetch('http://localhost:3001/api/reportes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipoReporte: parseInt(reportType),
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Datos recibidos:", data);
            if (!Array.isArray(data)) {
                console.error("reportData is not an array:", data);
                throw new Error("Los datos recibidos no son válidos.");
            }
            setReportData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error al recuperar los datos: ' + error.message);
        });
    };

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            width: "100vw",
            backgroundColor: "#ADD8E6", 
            textAlign: "center",
            padding: "20px",
            boxSizing: "border-box",
        },
        button: {
            padding: "10px 20px",
            margin: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "white",
            color: "black",
            border: "1px solid #ccc",
        },
        input: {
            padding: '0.5rem',
            margin: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: "white",
            color: "black",
        },
        select: {
            margin: 20,
            padding: 10,
            fontSize: "1rem",
            backgroundColor: "white",
            color: "black",
            border: "1px solid #ccc",
            borderRadius: "5px",
        },
        resultText: {
            color: "#000000", 
        }
    };

    return (
        <div style={styles.container}>
            <select style={styles.select} value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="1">Reporte 1: Platos más pedidos</option>
                <option value="2">Reporte 2: Horario con más pedidos</option>
                <option value="3">Reporte 3: Promedio de tiempo comiendo</option>
                <option value="4">Reporte 4: Quejas por persona</option>
                <option value="5">Reporte 5: Quejas por plato</option>
                <option value="6">Reporte 6: Eficiencia de meseros</option>
            </select>
            <input type="date" style={styles.input} value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
            <input type="date" style={styles.input} value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
            <button style={styles.button} onClick={handleFetchReport}>Buscar Reporte</button>
            <div>
                {reportData.map((item, index) => (
                    <div key={index} style={{ padding: '10px', margin: '5px' }}>
                        {/* Aplicar el estilo resultText a cada elemento de resultado */}
                        {reportType === '1' && <p style={styles.resultText}>{item.plato}: Cantidad Pedida - {item.cantidad_pedida}, Total Unidades - {item.total_unidades}</p>}
                        {reportType === '2' && <p style={styles.resultText}>Hora: {item.hora}, Número de Pedidos: {item.numero_de_pedidos}</p>}
                        {reportType === '3' && <p style={styles.resultText}>{item.numero_de_personas} personas: Tiempo promedio - {item.tiempo_promedio_minutos} minutos</p>}
                        {reportType === '4' && (
                            <div>
                                <p style={styles.resultText}>Cliente: {item.nombre_del_cliente}</p>
                                <p style={styles.resultText}>Personal implicado: {item.nombre_del_personal}</p>
                                <p style={styles.resultText}>Número de Quejas: {item.numero_de_quejas}</p>
                            </div>
                        )}
                        {reportType === '5' && <p style={styles.resultText}>{item.nombre_del_plato}: {item.numero_de_quejas} quejas</p>}
                        {reportType === '6' && (
                            <p style={styles.resultText}>{item.nombre_mesero}: Amabilidad - {item.promedio_amabilidad}, Calidad - {item.promedio_calidad_comida}, Exactitud - {item.promedio_exactitud_pedido}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reportes;
