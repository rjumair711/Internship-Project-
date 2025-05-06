import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/Card.jsx";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table.jsx";  // Import the Table component

export const investor = {
  name: "RJ Umair",
  image: "/RJ.jpg",
  bio: "Passionate investor focusing on tech and sustainable startups.",
  interests: "Green energy, HealthTech, AgriTech",
  companies: "EcoBox, SmartFarm"
};

export const mockEntrepreneurs = [
  {
    id: 1,
    name: "Ayesha Khan",
    startup: "EcoBox",
    pitch: "Eco-friendly packaging startup reducing plastic waste.",
    bio: "Environmental enthusiast passionate about reducing plastic pollution through innovative packaging solutions.",
    startupDescription: "EcoBox produces biodegradable and compostable packaging products for the food and retail industries.",
    fundingNeed: "$200,000 for scaling production and marketing.",
    pitchDeck: "Link to pitch deck or placeholder here."
  },
  {
    id: 2,
    name: "Zain Ahmed",
    startup: "SmartFarm",
    pitch: "AI-powered platform for precision farming and crop monitoring.",
    bio: "Tech entrepreneur aiming to revolutionize agriculture through AI and IoT technologies.",
    startupDescription: "SmartFarm offers farmers real-time data and insights to optimize crop yields and minimize resource use.",
    fundingNeed: "$500,000 for product development and farmer onboarding.",
    pitchDeck: "Link to pitch deck or placeholder here."
  },
  {
    id: 3,
    name: "Fatima Tariq",
    startup: "HealthSync",
    pitch: "A digital health platform for remote consultations.",
    bio: "Healthcare professional dedicated to making healthcare accessible via technology.",
    startupDescription: "HealthSync connects patients with certified doctors through a secure digital platform, providing remote consultations and health management.",
    fundingNeed: "$300,000 for app development and marketing.",
    pitchDeck: "Link to pitch deck or placeholder here."
  },
];

const InvestorDashboard = () => {
  const [view, setView] = useState("dashboard");
  const navigate = useNavigate();
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Investor Dashboard</h2>
        <a href="#profile" onClick={() => setView("profile")}>Profile</a>
        <a href="#entrepreneurs" onClick={() => setView("entrepreneurs")}>List of Entrepreneurs</a>
        <a href="#message" onClick={() => navigate('/chat?from=Investor&with=Enterpreneur')}>Message</a>
        </aside>

      {/* Main content */}
      <main className="main-content">
        {view === "entrepreneurs" && (
          <div id="lists">
            <h2 className="text-xl font-semibold mb-4">Entrepreneur List</h2>
            <Table className='custom-table'>
              <TableHeader className="bg-black">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Startup</TableHead>
                  <TableHead>Pitch Summary</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEntrepreneurs.map((entrepreneur) => (
                  <TableRow key={entrepreneur.id} className="hover:bg-transparent">
                    <TableCell>{entrepreneur.name}</TableCell>
                    <TableCell>{entrepreneur.startup}</TableCell>
                    <TableCell>{entrepreneur.pitch}</TableCell>
                    <TableCell className="text-right">
                      <Link
                        to={`/profile/entrepreneur/${entrepreneur.id}`}
                        className="text-blue-600" id="view-profile"
                      >
                        View Profile
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

{view === "profile" && (
  <Card id="card">
    <CardHeader>
      <CardTitle className="profile-name">{investor.name}</CardTitle>
      <img src={investor.image} alt={`${investor.name}'s profile`} id="img" />
    </CardHeader>
    <CardContent>
      <div className="profile-details">
        <p><strong>Bio:</strong> {investor.bio}</p>
        <p><strong>Investment Interests:</strong> {investor.interests}</p>
        <p><strong>Portfolio Companies:</strong> {investor.companies}</p>
      </div>
    </CardContent>
  </Card>
)}

      </main>
    </div>
  );
};

export default InvestorDashboard;
