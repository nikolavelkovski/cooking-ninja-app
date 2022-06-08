import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

export default function CreateRecipe() {
    const titleRef = useRef(null)
    const methodRef = useRef(null)
    const cookingTimeRef = useRef(null)
    const [selectedIngridient, setSelectedIngridient] = useState('')
    const { postData, data } = useFetch('http://localhost:3001/recipes', 'POST')
    const [allIngridients, setAllIngridients] = useState([]);
    const ingridientInput = useRef(null)
    const history = useHistory();

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const doc = { title: titleRef.current.value, ingredients: allIngridients, method: methodRef.current.value, cookingTime: cookingTimeRef.current.value + ' minutes' }
        try {
            await projectFirestore.collection('recipes').add(doc)
            history.push('/')
        } catch (err) {
            console.log(err)
        }

    }

    const handleAddIngridients = (e) => {
        e.preventDefault();
        if (selectedIngridient && !allIngridients.includes(selectedIngridient)) {
            setAllIngridients((prevIngridients) => [...prevIngridients, selectedIngridient])

        }
        setSelectedIngridient('');
        ingridientInput.current.focus();
    }

    useEffect(() => {
        if (data) {
            history.push('/')
        }

    }, [data, history])
    return (
        <Container>
            <form className="mt-4 p-4 mx-auto" style={{ maxWidth: "50%" }} onSubmit={formSubmitHandler}>

                <Form.Group className="mb-3" controlId="formGroupTitle">
                    <Form.Label>Recipe Title</Form.Label>
                    <Form.Control type="text" placeholder="..." ref={titleRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupMethod">
                    <Form.Label>Recipe Method</Form.Label>
                    <Form.Control type="text" placeholder="..." ref={methodRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupMethod">
                    <Form.Label>Cooking Time(minutes)</Form.Label>
                    <Form.Control type="text" placeholder="..." ref={cookingTimeRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupMethod">
                    <Form.Label>Recipe Ingredients</Form.Label>
                    <Form.Control value={selectedIngridient} type="text" placeholder="..." onChange={(e) => setSelectedIngridient(e.target.value)} ref={ingridientInput} />
                    <p>Current Ingredients: {allIngridients && allIngridients.map((ingridient, index) => <em className='text-muted fs-5' key={index}>{ingridient + ' | '}</em>)} </p>
                    <Button variant="primary mt-2" onClick={handleAddIngridients}>Add ingredient</Button>
                    <span className='ml-3 d-inline-blo'></span>
                </Form.Group>
                <Button type="submit" variant="success mt-5 mx-auto d-block px-5 fs-5">Add new Recipe +</Button>
            </form>

        </Container>
    )
}
