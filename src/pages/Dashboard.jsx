import React from "react";
import { supabase } from "../../lib/supabaseClient";


const Dashboard = () => {

  const handleSignOut = async () =>{
    await supabase.auth.signOut();
  }
  return (
    <>
      <div>Dashboard</div>
      <button onClick={handleSignOut}>Sign Out</button>{" "}
    </>
  );
};

export default Dashboard;
