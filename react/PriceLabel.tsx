import React, { useState, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'


const PriceLabel = () => {

  const [nonMemberPrice, setNonMemberPrice] = useState(0)
  const [memberPrice, setMemberPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const productContext = useProduct()
  let prodId = (productContext && productContext.selectedItem && productContext.selectedItem.itemId) ? productContext.selectedItem.itemId : "1"

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `/api/pricing/prices/${prodId}`
    ).then((response) => response.json())
    .then((prices: any) => {
      console.log("prices", prices)
      console.log(productContext)
      debugger
      setNonMemberPrice(prices.basePrice)
      setMemberPrice(prices.basePrice)
      if (prices && prices.fixedPrices && prices.fixedPrices.length){
        setMemberPrice(prices.fixedPrices[0].value)
      }
      setIsLoading(false)
    })
  }, [prodId])

    if (isLoading && !memberPrice && !nonMemberPrice) {
      return(null)
    }

    return(
      <div className={`pa2`} key="prodId">
        <div>Non-member Price: <strong> ${nonMemberPrice}.00 </strong></div>
        <div>Member Price: <strong> ${memberPrice}.00 </strong></div>
      </div>
    )
}

export default PriceLabel
