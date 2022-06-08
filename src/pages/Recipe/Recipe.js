import React, { useEffect, useState } from 'react'
import { Button, Card, Container, ListGroup, ListGroupItem, } from 'react-bootstrap';
import { projectFirestore } from '../../firebase/config'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch';

export default function Recipe() {
    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    const { id } = useParams();
    // const { data: recipe, isPending, error } = useFetch(`http://localhost:3001/recipes/${id}`)
    useEffect(() => {
        setIsPending(true);

        const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                setIsPending(false)
                setRecipe(doc.data())
            } else {
                setIsPending(false)
                setError("Could not find recipe")
            }
        })

        return () => {
            unsub()
        }
    }, [id])

    const handleUpdate = (id) => {
        debugger;
        projectFirestore.collection('recipes').doc(id).update({
            title: "Title something "
        })
    }
    return (
        <Container>
            {isPending && <h2 className='text-warning fs-2 text-center mt-4'>Loading...</h2>}
            {error && <h2 className='text-warning fs-2 text-center mt-4'>{error}</h2>}
            {recipe && (
                <Card className='p-4 mt-4' style={{ minHeight: "400px", minWidth: "80%" }}>
                    <Card.Body style={{ minHeight: "200px" }}>
                        <Card.Title className='text-center fs-2'>{recipe.title}</Card.Title>
                        <Card.Subtitle className="mb-4 text-muted text-center">{recipe.cookingTime}</Card.Subtitle>
                        <Card.Text className="fs-5">
                            {recipe.method}
                        </Card.Text>
                        <ListGroup horizontal className="mt-4">
                            <h3 className="fs-3 mr-2">ingredients:</h3>
                            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                <ListGroupItem variant='secondary' key={index}>{ingredient}</ListGroupItem>
                            ))}
                        </ListGroup>
                        <Button variant="primary" onClick={() => handleUpdate(id)}>Update</Button>
                    </Card.Body>
                    <hr />
                </Card >
            )}

        </Container>

    )
}
