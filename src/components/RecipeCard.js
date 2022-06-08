
import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { projectFirestore } from '../firebase/config'

export default function RecipeCard({ id, title, cookingTime, method }) {

    const handleDelete = (id) => {
        projectFirestore.collection('recipes').doc(id).delete();
    }
    return (
        <Card className='p-4 cards' style={{ geight: "400px", width: "400px" }}>
            <Card.Body style={{ minHeight: "200px" }}>
                <Card.Title className='text-center fs-2'>{title}</Card.Title>
                <Card.Subtitle className="mb-4 text-muted text-center">{cookingTime}</Card.Subtitle>
                <Card.Text className="fs-5">
                    {method.substring(0, 100) + '...'}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" className="mt-4">
                    <Link to={`/recipes/${id}`}>Cook This</Link>
                </Button>
                <Button variant="danger" className="mt-4" onClick={() => handleDelete(id)}>
                    Delete Recipe
                </Button>
            </Card.Footer>

        </Card >
    )
}
