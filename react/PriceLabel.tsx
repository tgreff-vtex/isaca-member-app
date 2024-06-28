import React, { useState, useEffect } from 'react'

const PriceLabel = () => {

  const [isMember, setIsMember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
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
          }
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  // if (isLoading) {
  //   return(null)
  // }

  if (isMember) {
    return(
      <div className={`tl f5 pa2`}>
        Member Price
      </div>
    )
  } else {
    return(
      <div className={`tl f5 pa2`}>
        Non-Member Price
      </div>
    )
  }
}

export default PriceLabel
