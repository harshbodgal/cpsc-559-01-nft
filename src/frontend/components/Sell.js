import { useState } from 'react'
import { ethers } from "ethers"
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0') 

const Sell = ({ marketplace, nft }) => {
        const [image, setImage] = useState('')
        const [price, setPrice] = useState(null)
        const [name, setName] = useState('')

        const post = async (event) => {
            event.preventDefault()
            const file = event.target.files[0]
            if (typeof file !== 'undefined') {
                try {
                    const result = await client.add(file)
                    console.log(result)
                    setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
                } catch (error){
                    console.log("ipfs image upload error: ", error)
                }
            }
        }

        const sellNFT = async () => {
            if (!image || !price || !name ) return  
            try{         
                const result = await client.add(JSON.stringify({image, price, name}))
                mintList(result)
            } catch(error) {
                console.log("ipfs uri upload error: ", error)
            }
        }
        const mintList = async (result) => {
            const uri = `https://ipfs.infura.io/ipfs/${result.path}`
            await(await nft.mint(uri)).wait()
            const id = await nft.tokenCount()
            await(await nft.setApprovalForAll(marketplace.address, true)).wait()
            const listPrice = ethers.utils.parseEther(price.toString())
            await(await marketplace.makeItem(nft.address, id, listPrice)).wait()
        }

        return(
            <Container className="mt-5">
            <Row className="justify-content-center">
              <Col md={8}>
                <Form onSubmit={post}>
                  <Form.Group controlId="formFile">
                    <Form.Label>Select file</Form.Label>
                    <Form.Control type="file" onChange={post} />
                  </Form.Group>
      
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                  </Form.Group>
      
                  <Form.Group controlId="formPrice">
                    <Form.Label>Price (in ETH)</Form.Label>
                    <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </Form.Group>
      
                  <Button onClick={sellNFT} type="submit" variant="primary" size="lg" block>
                    Create selling post & List NFT!
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>

    );
}

export default Sell