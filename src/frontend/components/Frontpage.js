import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

const Frontpage = ({ market, nft }) => {
    const [loading, setLoading] = useState(true)
    const [itemsforsale, setItemsforsale] = useState([])
    const loadItems = async () => {
        const count = await market.itemCount()
        let itemsforsale = []
        let i = 0
        while( i<=count){
            const itemforsale = await market.itemsforsale(i)
            if (!itemforsale.sold) {
                const uri = await nft.tokenURI(itemforsale.tokenId)
                const response = await fetch(uri)
                const data = await response.json()
                const price = await market.getTotalPrice(itemforsale.itemId)

                itemsforsale.push({
                    price,
                    itemId: itemforsale.itemId,
                    name: data.name,
                    image: data.image
                })
            }
            
        }
        setLoading(false)
        setItemsforsale(itemsforsale)
    }

    const purchaseItemsforsale = async (itemforsale) => {
        await (await market.purchaseItem(itemforsale.itemId, { value: itemforsale.price })).wait()
        loadItems()
    }

    return (
        <div className="flex justify-center">
            {itemsforsale.length > 0 ?               
                <Row s={1} m={2} l={4}>
                    {itemsforsale.map((itemforsale, num) => (
                        <Col key={num}>
                            <Button style={{ backgroundColor: 'skyblue' }} onClick={() => purchaseItemsforsale(itemforsale)} variant="primary" size="lg">
                                <img src={itemforsale.image} alt="Button Image" style={{ width: '20px', marginRight: '10px' }}/>
                                {itemforsale.name}
                                {ethers.utils.formatEther(itemforsale.price)} ETH
                            </Button>
                        </Col>
                    ))}
                </Row>
                :(
                    <main style={{ padding: "1rem 0" }}>
                    <h3>No listed assets</h3>
                    </main>
                )
            }
        </div>
        
    );
    
}

export default Frontpage