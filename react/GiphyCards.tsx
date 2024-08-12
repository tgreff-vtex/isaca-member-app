import React, { useState, useEffect } from 'react'

const GiphyCards = () => {

  const [isMember, setIsMember] = useState(false)
  const [memberType, setMemberType] = useState("Guest")

  useEffect(() => {
    fetch(
      `/api/sessions/?items=*`
    ).then((response) => response.json())
    .then((session: any) => {
      console.log(session)
      if (session.namespaces.profile.isAuthenticated.value){
        fetch(
          `/api/dataentities/CL/search?_fields=_all&email=${session.namespaces.profile.email.value}`,
          {
            method: "GET",
            headers: {
              "X-VTEX-API-AppKey": "vtexappkey-tylergreff-CVWCUW",
              "X-VTEX-API-AppToken":"QLBYQVDRZMHVXTVEHVFKQGOMNXNJRPBYIABGQSEHPEEPOOUFFYIHVSPJWOKTHTAJKIMWSPOORYULCYXZCHDTGTCPLRJBHLZVEUFFCXNQKTQXXDHYRLQZPHCQGWLBGMGG",
              "REST-Range": "resources=0-1"
            },
          }
        ).then((response) => response.json())
        .then((data: any) => {
          if (data && data.length){
            setIsMember(data[0].isacaMemberBoolean)
            setMemberType(data[0].isacaMemberTier)
          }
        })
      }
    })
  }, [])

  if (!isMember) {
    return(null)
  }

  return (
    <div className={`pa4 bg-mid-gray white`}>
      Membership Status: {memberType}
    </div>
  )
}

export default GiphyCards
