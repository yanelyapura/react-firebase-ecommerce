import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { ItemDetail } from './ItemDetail';
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

export const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const db = getFirestore();
        const itemDocRef = doc(db, "items", id);

        getDoc(itemDocRef).then((docSnapshot) => {
            if (docSnapshot.exists()) {
                const itemData = docSnapshot.data();
                setItem({
                    id: docSnapshot.id,
                    category: itemData.category,
                    description: itemData.description,
                    pictureUrl: itemData.pictureUrl,
                    price: itemData.price,
                    stock: itemData.stock,
                    title: itemData.title,
                });
            } else {
                console.warn("No se encontró el elemento");
            }
        }).catch((error) => {
            console.error("Error obteniendo el documento:", error);
        });
    }, [id]);

    return (
        <Container className="mt-4">
            { item ? <ItemDetail item={item} /> : <>Loading...</>}
        </Container>
    );
};
