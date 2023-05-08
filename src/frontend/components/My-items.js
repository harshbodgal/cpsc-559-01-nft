import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Button} from 'react-bootstrap'

function soldItems(items) {
  return (
    <>
      <h2>Sold</h2>
      <Row s={1} m={2} l={4}>
        {items.map((itemforsale, num) => (
            <Col key={num}>
                <Button style={{ backgroundColor: 'skyblue' }}>
                    <img src={itemforsale.image} alt="Button Image" style={{ width: '20px', marginRight: '10px' }}/>
                    {itemforsale.name}
                    {ethers.utils.formatEther(itemforsale.price)} ETH received!
                </Button>
            </Col>
        ))}
    </Row>
    </>
    )
}

export default function MyListedItems({ market, nft, wallet }) {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [sold, setSold] = useState([])
    const loadListedItems = async () => {
        const itemCount = await market.itemCount()
        let items = []
        let sold = []
        for (let indx = 1; indx <= itemCount; indx++) {
        const i = await market.items(indx)
        if (i.seller.toLowerCase() === wallet) {
            const uri = await nft.tokenURI(i.tokenId)
            const response = await fetch(uri)
            const metadata = await response.json()
            const totalPrice = await market.getTotalPrice(i.itemId)
            let item = {
            totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            image: metadata.image
            }
            items.push(item)
            if (i.sold) sold.push(item)
        }
        }
        setLoading(false)
        setItems(items)
        setSold(sold)
    }
    useEffect(() => {
        loadListedItems()
    }, [])
    return (
        <div className="flex justify-center">
        {items.length > 0 ?
            <div className="px-5 py-3 container">
                <h2>Listed</h2>
                <Row s={1} m={2} l={4}>
                {items.map((itemforsale, num) => (
                    <Col key={num}>
                        <Button style={{ backgroundColor: 'skyblue' }}>
                            <img src={itemforsale.image} alt="Button Image" style={{ width: '20px', marginRight: '10px' }}/>
                            {itemforsale.name}
                            {ethers.utils.formatEther(itemforsale.price)} ETH received!
                        </Button>
                    </Col>
                ))}
            </Row>
                {sold.length > 0 && soldItems(sold)}
            </div>
        : (
            <main style={{ padding: "1rem 0" }}>
                <h2 style={{alignContent: 'center'}}>No listed assets</h2>
            </main>
            )}
        </div>
    );
}
  