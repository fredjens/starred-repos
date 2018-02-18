import store from '../store';
import { updateFirebase } from '../ducks/collections';

export function startFirebase(ref, firebase) {
  const database = firebase.database();

  return database.ref(ref).on('value', (snapshot) => {
    const collection = snapshot.val();
    store.dispatch(updateFirebase(collection));
  });
}