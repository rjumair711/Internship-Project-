import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../../components/ui/Card.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table.jsx"; // Import your Table component

const mockRequests = [
  {
    id: 1,
    investorName: "Omar Siddiqui",
    profileSnippet: "Specializes in early-stage tech startups.",
    status: "Pending",
  },
  {
    id: 2,
    investorName: "Sana Malik",
    profileSnippet: "Focus on HealthTech and sustainability.",
    status: "Accepted",
  },
  {
    id: 3,
    investorName: "Ali Raza",
    profileSnippet: "Green energy and infrastructure projects.",
    status: "Rejected",
  },
];
export const enterpreneur = {
  name: "M Harris",
  image: "/img.jfif",
  bio: "Innovative entrepreneur passionate about HealthTech solutions.",
  description: "Building a remote health consultation platform.",
  funding: "Seeking $500,000 for product development and marketing.",
  pitchDeck: "(Placeholder for pitch deck link or upload)"
};


const EntrepreneurDashboard = () => {
  const [view, setView] = useState("dashboard");
  const navigate = useNavigate();
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Entrepreneur Dashboard</h2>
        <a href="#profile" onClick={() => setView("profile")}>Profile</a>
        <a href="#collaboration-requests" onClick={() => setView("collaboration-requests")}>Collaboration Requests</a>
        <a href="#message" onClick={() => navigate('/chat?from=Enterpreneur&with=Investor')}>Message</a>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {view === "collaboration-requests" && (
          <div id="collabration-lists">
            <h2 className="text-xl font-semibold mb-4">Collaboration Requests</h2>
            <Table className="custom-table">
              <TableHeader className="bg-black">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Investor Name</TableHead>
                  <TableHead>Profile Snippet</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-transparent">
                    <TableCell>{request.investorName}</TableCell>
                    <TableCell>{request.profileSnippet}</TableCell>
                    <TableCell>{request.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

{view === "profile" && (
  <Card id="card">
    <CardHeader>
      <CardTitle className="profile-name">{enterpreneur.name}</CardTitle>
      <img src={enterpreneur.image} alt={`${enterpreneur.name}'s profile`} id="img" />
    </CardHeader>
    <CardContent>
      <div className="profile-details">
        <p><strong>Bio:</strong> {enterpreneur.bio}</p>
        <p><strong>Startup Description:</strong> {enterpreneur.description}</p>
        <p><strong>Funding Need:</strong> {enterpreneur.funding}</p>
        <p><strong>Pitch Deck:</strong> {enterpreneur.pitchDeck}</p>
      </div>
    </CardContent>
  </Card>
)}

      </main>
    </div>
  );
};

export default EntrepreneurDashboard;
