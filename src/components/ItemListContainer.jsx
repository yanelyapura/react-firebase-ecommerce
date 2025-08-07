import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { ItemList } from "../components/itemList";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

export const ItemListContainer = (props) => {
  const [items, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "items");
    let filteredQuery = itemsCollection;

    // Si hay un parámetro de categoría en la URL, filtramos por esa categoría
    if (id) {
      const categoryQuery = query(itemsCollection, where("category", "==", id));
      filteredQuery = categoryQuery;
    }

    getDocs(filteredQuery).then((snapshot) => {
      if (snapshot.size === 0) {
        console.warn("No se encontraron productos");
      }
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          category: doc.data().category,
          description: doc.data().description,
          pictureUrl: doc.data().pictureUrl,
          price: doc.data().price,
          stock: doc.data().stock,
          title: doc.data().title,
        }))
      );
    });
  }, [id]); // Asegúrate de incluir "id" como dependencia para que se actualice cuando cambie

  return (
    <Container className="mt-4">
      <h1>{props.greeting}</h1>
      {items ? <ItemList items={items} /> : <>Loading</>}
    </Container>
  );
};
