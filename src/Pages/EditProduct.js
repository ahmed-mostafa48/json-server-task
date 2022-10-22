import React, { useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const EditProduct = () => {

    
    const {ID} = useParams()

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [items, setItems] = useState(0);

    const navigate = useNavigate();


  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:9000/products/${ID}`,
    }).then((info) => {
      console.log(info.data);
        setName(info.data.name)
        setPrice(info.data.price)
        setItems(info.data.items)

    });
  }, []);


  const formSubmit = (e) => {
    e.preventDefault();

    if (name.length > 0 && price > 0  && items > 0  ) {
        axios({
            method : "put",
            url : `http://localhost:9000/products/${ID}`,
            data : {
                name,
                price,
                items
            }
        }).then(()=>{
            navigate("/products");

        })
    }

  }

  return (
    <div>
        <h1>EditProduct {ID}</h1>


        <div className="mt-5">
            <Form onSubmit={formSubmit}>
                <Form.Group className="mb-3" controlId="Product Name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    type="search"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Product Price">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Product Items">
                <Form.Label>Product Items</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Product Items"
                    value={items}
                    onChange={(e) => setItems(e.currentTarget.value)}
                />
                </Form.Group>

                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
      </div>

    </div>
  )
}

export default EditProduct
