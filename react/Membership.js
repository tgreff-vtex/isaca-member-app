import React, { useEffect, useState } from "react";
import { Layout, PageBlock, PageHeader, Button } from 'vtex.styleguide'
// import styles from './teamAdmin.css'

const Membership = () => {

  const [isMember, setIsMember] = useState(false)
  const [memberType, setMemberType] = useState("Guest")

  useEffect(() => {
    fetch(
      `/api/sessions/?items=*`
    ).then((response) => response.json())
    .then((session) => {
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
        .then((data) => {
          if (data && data.length){
            setIsMember(data[0].isacaMemberBoolean)
            setMemberType(data[0].isacaMemberTier)
          }
        })
      }
    })
  }, [])

  return <Layout
    pageHeader={
      <PageHeader
        title="Membership Details"
      />
    }
  >
    <PageBlock variation="full">
      <div>Membership Status:   <strong>   {memberType}   </strong></div>

      <div className="mb3 mt6">
        <span className="mr3">
          <Button
          variation="secondary">
            Update
          </Button>
        </span>
        <span>
          <Button
          variation="danger">
            Cancel
          </Button>
        </span>
      </div>

    </PageBlock>
  </Layout>

}

export default Membership
