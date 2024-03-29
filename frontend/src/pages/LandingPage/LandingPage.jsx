import React, { useState, useEffect } from "react";
import { Header, Sidebar } from "../../components";
import axios from "axios";
import "./landingpage.css";
import ToolCard from "../../components/card/ToolCard";
import toast from 'react-hot-toast';

const LandingPage = () => {
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(`${backendUrl}/api/products/`)
      .then((response) => {
        setTools(response.data);
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="landing-page">
      <Header onSearch={handleSearch} />
      <Sidebar />
      <div className="landing-page-content">
        {tools
          .filter((tool) =>
            searchTerm === ""
              ? true
              : tool.toolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tool.toolCategory?.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((tool, index) => (
            <div>
            <ToolCard data={tool} index={index} key={tool.itemId}/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LandingPage;
