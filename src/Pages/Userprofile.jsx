import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../Redux/Services/Post";
import LoadingPage from "./LoadingPage"
import Sidenavbar from "../Component/Sidenavbar"
export default function UserProfile() {
  const { id } = useParams();
  console.log("URL Param ID:", id);

  const { data: user, isLoading, isError } = useGetSingleUserQuery(id);

  console.log("API Response:",useGetSingleUserQuery(id) );

  if (isLoading) return <LoadingPage/>;
  if (isError) return <div>Error loading user</div>;
console.log("user profile ",user);
const newsetofPost=[...new Set (user.posts)]
  return (
    <div style={{display:"flex"}}>
    <Sidenavbar/>

    <div style={{backgroundColor:"pink",width:"85%",height:"100vh",padding:"20px",boxSizing:"border-box"}}>
      <div style={{display:"flex",}}>
            <div  
       style={{
                height: "150px",
                width: "150px",
                background:"linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                borderRadius: "50%",
                display: "flex",
                boxSizing: "border-box",
                overflow: "auto",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color:"white",

              }}>
                {user?.username}
                </div>
                <div style={{display:"flex",gap:"40px",paddingLeft:"40px"}}>
                   <p>following</p>
                   <p>followers</p>
                   <p>posts</p>
                </div>
      </div>
    
      <p> {user?.email}</p>

      <div className="userposts" style={{display:"flex",gap:"20px",}}>
       {
      newsetofPost.map((u)=>(
            <div style={{backgroundColor:"grey",height:"150px",width:"150px",gap:"10px",display:"flex",flexDirection:"column",gap:"20px"}}>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>{u.title}</div>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>    {u.content?.map((c, i) =>
                  c.children?.map((topic, j) => (
                    <span
                      key={`${i}-${j}`}
                      dangerouslySetInnerHTML={{ __html: topic.text }}
                    />
                  ))
                )}</div>
            </div>
     
        ))
       }
      </div>
    </div>
</div>
  );

}
