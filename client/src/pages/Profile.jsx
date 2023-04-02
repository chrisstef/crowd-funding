import React, { useState, useEffect } from "react";
import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract && address) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <>
      {address ? (
        <DisplayCampaigns
          title="My Campaigns"
          isLoading={isLoading}
          campaigns={campaigns}
        />
      ) : (
        <>
          <div className="flex justify-center items-center sm:min-w-[380px] bg-[#1c1c24] rounded-[10px] sm:p-10 p-4">
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              Connect your wallet to view your Campaign.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
