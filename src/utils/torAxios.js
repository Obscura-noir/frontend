import axios from "axios";

const torAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001", // укажи свой backend
  timeout: 20000, // увеличенный таймаут для TOR
  headers: {
    "Content-Type": "application/json",
    // любые дополнительные TOR-friendly заголовки
  },
  // Не используем внешние прокси/интерцепторы, чтобы не "протекать" наружу
});

export default torAxios; 