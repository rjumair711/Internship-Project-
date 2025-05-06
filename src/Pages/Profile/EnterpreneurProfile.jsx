// src/Pages/Chat/ChatPage.jsx
import React from "react";
import { mockEntrepreneurs } from "../Dashboard/InvestorDashboard";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card.jsx";


const EnterpreneurProfile = () => {
  const { id } = useParams();
  const enterpreneur = mockEntrepreneurs.find((e) => e.id === parseInt(id));

  if (!enterpreneur) {
    return <div>Enterpreneur not found</div>
  }
  return (
    <div id="profilePageContainer" className="profile-page">
      <Card id="entrepreneurCard" className="entrepreneur-card">
      <CardHeader id="cardHeader" className="card-header">
  <h2 className="text-2xl font-semibold">{`${enterpreneur.name} - ${enterpreneur.startup}`}</h2>
</CardHeader>

        <CardContent id="cardContent" className="card-content">
          <p>
            <strong className="label">Bio:</strong> {enterpreneur.bio}
          </p>
          <p>
            <strong className="label">Startup Description:</strong>{' '}
            {enterpreneur.startupDescription}
          </p>
          <p>
            <strong className="label">Funding Need:</strong>{' '}
            {enterpreneur.fundingNeed}
          </p>
          <p>
            <strong className="label">Pitch Deck:</strong> {enterpreneur.pitchDeck}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnterpreneurProfile; // Ensure this is added
