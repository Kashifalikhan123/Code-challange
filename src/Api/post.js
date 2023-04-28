import React from "react";
export default async function Post(formData) {
    try{
    var result= await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        "access-control-allow-origin" : "*"
       },
  
        body: JSON.stringify(formData)
      })
        const res=await result.json()
        return res
    }catch(e){

    }
}
